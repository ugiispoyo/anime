import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #e5e7eb 25%,
    #f3f4f6 37%,
    #e5e7eb 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
  border-radius: 8px;
`;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PosterSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 380px;
  border-radius: 12px;
`;

const TitleSkeleton = styled(SkeletonBase)`
  width: 70%;
  height: 28px;
  margin-bottom: 12px;
`;

const SubTitleSkeleton = styled(SkeletonBase)`
  width: 40%;
  height: 18px;
  margin-bottom: 16px;
`;

const MetaSkeleton = styled.div`
  display: flex;
  gap: 12px;
`;

const BadgeSkeleton = styled(SkeletonBase)`
  width: 120px;
  height: 26px;
  border-radius: 999px;
`;

const Section = styled.div`
  margin-top: 32px;
`;

const LineSkeleton = styled(SkeletonBase)`
  height: 14px;
  margin-bottom: 10px;

  &:last-child {
    width: 60%;
  }
`;

export default function AnimeDetailSkeleton() {
  return (
    <Wrapper>
      <TopSection>
        <PosterSkeleton />

        <div>
          <TitleSkeleton />
          <SubTitleSkeleton />

          <MetaSkeleton>
            <BadgeSkeleton />
            <BadgeSkeleton />
          </MetaSkeleton>
        </div>
      </TopSection>

      <Section>
        <LineSkeleton />
        <LineSkeleton />
        <LineSkeleton />
        <LineSkeleton />
        <LineSkeleton />
      </Section>
    </Wrapper>
  );
}
