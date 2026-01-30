import type { T_Anime } from './anime/types';

export type T_State = {
  /* Global state */
  is_loading_action: {
    [key: string]: boolean;
  } | null

  /* Module State */
  Anime: Partial<T_Anime> 
};
