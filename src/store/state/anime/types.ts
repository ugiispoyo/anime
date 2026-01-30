export type T_Anime = {
  list: T_List;
  detail: T_Detail;
};

export type T_List = {
  data: Array<T_ListDetail>;
  pagination: {
    totalData: number;
    limit: number;
    page: number;
    totalPage: number;
  };
};

export type T_ListDetail = {
  id: string;
  attributes: {
    canonicalTitle: string;
    titles: {
      en?: string;
      ja_jp?: string;
    };
    posterImage: {
      small: string;
      original: string;
    };
    synopsis: string;
    averageRating: string;
  };
};

export type T_Detail = {
  id: string;
  titles: {
    en?: string;
    ja_jp?: string;
  };
  description: string;
  synopsis: string;
  posterImage: string;
  averageRating: string;
  startDate: string;
  endDate: string;
  canonicalTitle: string;
};
