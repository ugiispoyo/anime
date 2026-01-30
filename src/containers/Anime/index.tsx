import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import AnimeCard from "./components/card";

import { useStore } from "@/store";
import useLogic from "./hook";
import { SkeletonCard } from "@/components/Skeleton";
import Pagination from "@/components/Pagination";
import { cleanQueryString } from "@/utils/cleanQueryString";

export const Grid = styled.div`
  display: grid;
  gap: 16px;

  /* Large screens */
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Small (mobile) */
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
`;

const Anime = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { getData } = useLogic();
  const { is_loading_get_data, list } = useStore((s) => ({
    is_loading_get_data: s.is_loading_action?.is_loading_get_data,
    list: s.Anime.list,
  }));

  useEffect(() => {
    const page = searchParams.get("page") || 1;
    getData(Number(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const onChangePage = (page: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", page.toString());
    navigate(`${pathname}${cleanQueryString(currentParams?.toString())}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {is_loading_get_data ? (
        <Grid>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </Grid>
      ) : (
        <>
          {list !== null && list?.data?.length > 0 ? (
            <>
              <Grid>
                {list?.data?.map((item) => (
                  <AnimeCard key={item.id} anime={item} />
                ))}
              </Grid>
              <Pagination
                page={list.pagination?.page}
                onChange={onChangePage}
                totalPage={list?.pagination?.totalPage}
              />
            </>
          ) : (
            <span>Data tidak ditemukan!</span>
          )}
        </>
      )}
    </>
  );
};

export default Anime;
