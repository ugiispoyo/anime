import type { T_Detail } from "@/store/state/anime/types";
import type { AnimeDetailResponse, AnimeResponse } from "@/types/anime";

export type T_ActionAnime =
  | {
      type?: never;
      value?: never;
    }
  | {
      type: "SET_LIST_ANIME";
      value: AnimeResponse;
    }
  | {
      type: "SET_DETAIL_ANIME";
      value: AnimeDetailResponse;
    };

