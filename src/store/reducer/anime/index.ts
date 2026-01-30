import type { AnimeResponse } from "@/types/anime";
import type { T_ActionAnime } from "./types";
import type {
  T_ListDetail,
  T_Anime as T_State,
} from "@/store/state/anime/types";

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
    case "SET_LIST_ANIME": {
      const { limit, page, list, totalPage } = extractionData(value);

      const listData = {
        list: {
          data: list,
          pagination: {
            totalData: value.meta.count,
            limit,
            page,
            totalPage,
          },
        },
      };

      return {
        ...state,
        ...listData,
      };
    }
    case "SET_DETAIL_ANIME": {
      const original = value?.data;
      const { attributes } = original;

      return {
        ...state,
        detail: {
          id: original?.id,
          titles: {
            en: attributes?.titles?.en,
            ja_jp: attributes?.titles?.en_jp,
          },
          averageRating: attributes?.averageRating,
          description: attributes?.description,
          posterImage: attributes?.posterImage?.original,
          synopsis: attributes?.synopsis,
          startDate: attributes?.startDate,
          endDate: attributes?.endDate,
          canonicalTitle: attributes?.canonicalTitle,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;

function extractionData(item: AnimeResponse) {
  const list: Array<T_ListDetail> = item?.data?.map((item) => {
    return {
      id: item.id,
      attributes: {
        canonicalTitle: item.attributes.canonicalTitle,
        titles: {
          en: item.attributes.titles.en,
          ja_jp: item.attributes.titles.ja_jp,
        },
        averageRating: item.attributes.averageRating,
        synopsis: item.attributes.synopsis,
        posterImage: {
          small: item.attributes.posterImage.small,
          original: item.attributes.posterImage.original,
        },
      },
    };
  });

  const url = item?.links?.next || item?.links?.prev;

  const params = new URL(url).searchParams;

  const limit = Number(params.get("page[limit]"));
  const offset = Number(params.get("page[offset]"));

  return {
    limit,
    page: offset / limit,
    list,
    totalPage: Math.ceil(item?.meta?.count / limit),
  };
}
