import type { T_State } from "./types";

import anime from "./anime";

const state: T_State = {
  /* global */
  is_loading_action: null,

  /* module */
  Anime: anime,
};

export default state;
