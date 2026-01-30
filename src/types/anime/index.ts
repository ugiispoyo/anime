export interface AnimeResponse {
  data: Array<Anime>;
  links: PaginationLinks;
  meta: PaginationMeta;
}

export interface Anime {
  id: string;
  type: string;
  links: Links;
  attributes: AnimeAttributes;
  relationships: AnimeRelationships;
}

export interface Links {
  self: string;
}

export interface AnimeAttributes {
  createdAt: string;
  updatedAt: string;
  slug: string;
  synopsis: string;
  description: string;
  coverImageTopOffset: number;

  titles: AnimeTitles;
  canonicalTitle: string;
  abbreviatedTitles: string[];

  averageRating: string;
  ratingFrequencies: Record<string, string>;

  userCount: number;
  favoritesCount: number;

  startDate: string;
  endDate: string | null;
  nextRelease: string | null;

  popularityRank: number;
  ratingRank: number;

  ageRating: string;
  ageRatingGuide: string;

  subtype: string;
  status: string;
  tba: string | null;

  posterImage: ImageSet;
  coverImage: CoverImage;

  episodeCount: number;
  episodeLength: number;
  totalLength: number;

  youtubeVideoId: string;
  showType: string;
  nsfw: boolean;
}

export interface AnimeTitles {
  en?: string;
  en_jp?: string;
  ja_jp?: string;
}

export interface ImageSet {
  tiny: string;
  small: string;
  medium?: string;
  large: string;
  original: string;
  meta: ImageMeta;
}

export interface CoverImage {
  tiny: string;
  small: string;
  large: string;
  original: string;
  meta: ImageMeta;
}

export interface ImageMeta {
  dimensions: {
    tiny: ImageDimension;
    small?: ImageDimension;
    medium?: ImageDimension;
    large: ImageDimension;
  };
}

export interface ImageDimension {
  width: number;
  height: number;
}

export interface AnimeRelationships {
  genres: RelationshipLinks;
  categories: RelationshipLinks;
  castings: RelationshipLinks;
  installments: RelationshipLinks;
  mappings: RelationshipLinks;
  reviews: RelationshipLinks;
  mediaRelationships: RelationshipLinks;
  characters: RelationshipLinks;
  staff: RelationshipLinks;
  productions: RelationshipLinks;
  quotes: RelationshipLinks;
  episodes: RelationshipLinks;
  streamingLinks: RelationshipLinks;
  animeProductions: RelationshipLinks;
  animeCharacters: RelationshipLinks;
  animeStaff: RelationshipLinks;
}

export interface RelationshipLinks {
  links: {
    self: string;
    related: string;
  };
}

export interface PaginationLinks {
  first: string;
  next?: string;
  prev?: string;
  last: string;
}

export interface PaginationMeta {
  count: number;
}
