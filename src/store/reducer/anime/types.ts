import type { T_List } from "@/store/state/anime/types";

export type T_ActionAnime =
  | {
      type?: never;
      value?: never;
    }
  | {
      type: "SET_TO_DO";
      value: T_List;
    }
  | {
      type: "SET_TO_DONE";
      value: number;
    };

