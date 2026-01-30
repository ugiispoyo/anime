const BASE_URL = 'https://kitsu.io/api/edge';

export const fetchAnimeList = async (page: number, limit = 10) => {
  const offset = (page - 1) * limit;
  const res = await fetch(
    `${BASE_URL}/anime?page[limit]=${limit}&page[offset]=${offset}`
  );
  return res.json();
};

export const fetchAnimeDetail = async (id: string) => {
  const res = await fetch(`${BASE_URL}/anime/${id}`);
  return res.json();
};