import { fetchAnimeList } from "@/services/anime";
import { dispatch } from "@/store";

import type { T_Logic } from "./type";

const useLogic = (): T_Logic => {

  const getData = async (page = 1) => {
    dispatch({
      type: "SET_IS_LOADING_ACTION",
      value: {
        is_loading_get_data: true,
      },
    });
    try {
      const data = await fetchAnimeList(page, 20);

      dispatch({
        type: "SET_LIST_ANIME",
        value: data,
      });
      dispatch({
        type: "SET_IS_LOADING_ACTION",
        value: {
          is_loading_get_data: false,
        },
      });
    } catch (e: any) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING_ACTION",
        value: {
          is_loading_get_data: false,
        },
      });
      return;
    }
  };

  return {
    getData,
  };
};

export default useLogic;
