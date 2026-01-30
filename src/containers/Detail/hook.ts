import { fetchAnimeDetail } from "@/services/anime";
import { dispatch } from "@/store";

import type { T_Logic } from "./type";

const useLogic = (): T_Logic => {

  const getDetail = async (id: string) => {
    dispatch({
      type: "SET_IS_LOADING_ACTION",
      value: {
        is_loading_get_detail: true,
      },
    });
    try {
      const data = await fetchAnimeDetail(id);

      dispatch({
        type: "SET_DETAIL_ANIME",
        value: data,
      });
      dispatch({
        type: "SET_IS_LOADING_ACTION",
        value: {
          is_loading_get_detail: false,
        },
      });
    } catch (e: any) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING_ACTION",
        value: {
          is_loading_get_detail: false,
        },
      });
      return;
    }
  };

  return {
    getDetail,
  };
};

export default useLogic;