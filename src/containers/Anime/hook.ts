import { useEffect } from "react";

import { fetchAnimeList } from "@/services/anime";
import { dispatch } from "@/store";

const useLogic = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch({
      type: "SET_IS_LOADING_ACTION",
      value: {
        is_loading_get_data: true,
      },
    });
    try {
      const data = await fetchAnimeList(1, 10);

      console.log(data);
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

  return {};
};

export default useLogic;
