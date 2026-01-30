import { getFromCache, setToCache } from "@/libs/cache";

const BASE_URL = "https://kitsu.io/api/edge";

export const fetchAnimeList = async (page: number, limit = 10) => {
  const offset = (page - 1) * limit;
  const url = `${BASE_URL}/anime?page[limit]=${limit}&page[offset]=${offset}`;

  /* if there have cache */
  if (getFromCache(url)) {
    return getFromCache(url);
  }
  const res = await fetch(url);

  const result = res.json();

  /* set to chache */
  setToCache(url, result);
  return result;
};

export const fetchAnimeDetail = async (id: string) => {
  const url = `${BASE_URL}/anime/${id}`;

  /* if there have cache */
  if (getFromCache(url)) {
    return getFromCache(url);
  }

  const res = await fetch(url);

  const result = res.json();

  /* set to chache */
  setToCache(url, result);
  return result;
};
