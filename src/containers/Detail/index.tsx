import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { SkeletonDetail } from "@/components/Skeleton";

import useLogic from "./hook";

import { useStore } from "@/store";
import Image from "@/components/LazyImage";

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WrapPoster = styled.div`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  max-height: 350px;
  overflow: hidden;
  max-width: 300px;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin: 0;
`;

const JapaneseTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  margin: 6px 0 16px;
`;

const Meta = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Badge = styled.span`
  background: #f3f4f6;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Section = styled.section`
  margin-top: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Synopsis = styled.p`
  font-size: 14px;
  line-height: 1.8;
  color: #374151;
`;

export default function Detail() {
  const { id } = useParams();

  const { getDetail } = useLogic();
  const { is_loading_get_detail, detail } = useStore((s) => ({
    is_loading_get_detail: s.is_loading_action?.is_loading_get_detail,
    detail: s.Anime.detail,
  }));

  useEffect(() => {
    if (!id) return;
    getDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (is_loading_get_detail) {
    return (
      <Wrapper>
        <SkeletonDetail />
      </Wrapper>
    );
  }

  if (!detail) return null;

  return (
    <Wrapper>
      <TopSection>
        <WrapPoster>
          <Image
            src={detail.posterImage}
            alt={detail.titles?.en}
            heigthPlaceholder={350}
            widthPlaceholder={300}
          />
        </WrapPoster>

        <div>
          <Title>{detail.titles.en || detail.canonicalTitle}</Title>
          <JapaneseTitle>{detail.titles.ja_jp}</JapaneseTitle>

          <Meta>
            <Badge>⭐ Rating: {detail.averageRating || "N/A"}</Badge>
            {detail.startDate && <Badge>📅 {detail.startDate}</Badge>}
          </Meta>
        </div>
      </TopSection>

      <Section>
        <SectionTitle>Synopsis</SectionTitle>
        <Synopsis>{detail.synopsis}</Synopsis>
      </Section>
    </Wrapper>
  );
}
