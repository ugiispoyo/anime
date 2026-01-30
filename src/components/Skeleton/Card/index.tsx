import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -450px 0; }
  100% { background-position: 450px 0; }
`;

const SkeletonCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
`;

const SkeletonImage = styled.div`
  height: 220px;
  background: linear-gradient(
    90deg,
    #eee 25%,
    #f5f5f5 37%,
    #eee 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

const SkeletonText = styled.div`
  height: 14px;
  margin: 10px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    #eee 25%,
    #f5f5f5 37%,
    #eee 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;

  &:last-child {
    width: 60%;
  }
`;

export default function AnimeCardSkeleton() {
  return (
    <SkeletonCard>
      <SkeletonImage />
      <SkeletonText />
      <SkeletonText />
    </SkeletonCard>
  );
}
