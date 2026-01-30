import type { T_ActionAnime } from "./types";
import type { T_Anime as T_State } from "@/store/state/anime/types";

const reducer = (
  state: T_State,
  action: T_ActionAnime,
  injectState: T_State,
): T_State => {
  const { type, value } = action;

  if (typeof type === "undefined") {
    return { ...state, ...(injectState ?? {}) };
  }

  switch (type) {
    default:
      return state;
  }
};

export default reducer;
