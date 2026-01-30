import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import type { T_ListDetail } from "@/store/state/anime/types";

const Card = styled.div`
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
`;

const Content = styled.div`
  padding: 12px;
`;

export default function AnimeCard({ anime }: { anime: T_ListDetail }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/anime/${anime.id}`)}>
      <Image src={anime.attributes.posterImage.small} />
      <Content>
        <h4>{anime.attributes.titles.en || anime.attributes.canonicalTitle}</h4>
        <p>{anime.attributes.titles.ja_jp}</p>
      </Content>
    </Card>
  );
}
