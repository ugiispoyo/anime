import type { T_State } from "../types";

import type { T_ActionAnime } from "./anime/types";

export type T_Action = | (
  | {
    type?: never;
    value?: never;
  }
  | T_ActionAnime
) |
{
  type: "SET_IS_LOADING_ACTION";
  value: {
    [key: string]: boolean;
  };
} | {
  type?: never;
  value?: never;
} & Partial<T_State>;
