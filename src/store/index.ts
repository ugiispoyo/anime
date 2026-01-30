import { useRef, useSyncExternalStore } from "react";

import State from "./state";
import Reducer from "./reducer";

import type { T_Action } from "./types";
import  type { T_State } from "./state/types";

let currentState: T_State = { ...State };
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const isPlainObject = (v: any) => {
  if (v === null || typeof v !== "object") return false;
  if (Array.isArray(v)) return false;

  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
};

/* For check multiple */
const shallowEqual = (a: any, b: any) => {
  if (Object.is(a, b)) return true;
  if (!isPlainObject(a) || !isPlainObject(b)) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  for (const k of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    if (!Object.is(a[k], b[k])) return false;
  }
  return true;
};

/* For initial state */
export const initStore = (init?: Partial<T_State>) => {
  if (!init) return;
  currentState = { ...currentState, ...init };
  if (typeof window !== "undefined") (window as any).state = currentState; /* for debug */
  listeners.forEach((l) => l());
};

/* For dispatch or change state */
export const dispatch = (action: T_Action) => {
  const next = Reducer(currentState, action);

  if (Object.is(next, currentState)) return;

  currentState = next;

  if (typeof window !== "undefined") {
    (window as any).state = currentState; /* for debug */
  }

  listeners.forEach((l) => l());
};

/* For get store state */
export const useStore = <Selected,>(
  selector: (s: T_State) => Selected = ((s: T_State) => s as unknown as Selected)
) => {
  const lastRef = useRef<Selected | null>(null);

  return useSyncExternalStore(
    subscribe,
    () => {
      const next = selector(currentState);
      const prev = lastRef.current;

      if (prev !== null && isPlainObject(next) && isPlainObject(prev) && shallowEqual(prev, next)) {
        return prev;
      }

      lastRef.current = next;
      return next;
    },
    () => selector({ ...State } as T_State) /* init for server side */
  );
};