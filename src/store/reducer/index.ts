import type { T_Action, T_State } from "./../types";

import AnimeReducer from "./anime";

import type { T_ActionAnime } from "./anime/types";

const reducer = (state: T_State, action: T_Action): T_State => {
  let nextState = state;
  const { type, value } = action;

  /* Global reducer for global state */
  if (typeof type !== "undefined") {
    switch (type) {
      case "SET_IS_LOADING_ACTION":
        nextState = {
          ...nextState,
          is_loading_action: {
            ...nextState.is_loading_action,
            ...(value ?? {}),
          },
        };
        break;
      default:
        break;
    }
  }

  const patch: Partial<T_State> =
    type === undefined ? (action as Partial<T_State>) : {};

  return {
    ...nextState,
    ...patch,

    Anime: AnimeReducer(
      nextState.Anime as any,
      action as unknown as T_ActionAnime,
      (patch as any).Anime,
    ),
  };
};

export default reducer;
