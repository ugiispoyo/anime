import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
`;

const HeaderInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 12px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.h1`
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  margin: 0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #2563eb;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <HeaderWrapper>
      <HeaderInner>
        <Brand onClick={() => navigate("/")}>Anime List</Brand>

        {!isHome && (
          <BackButton onClick={() => navigate(-1)}>
            ← Back
          </BackButton>
        )}
      </HeaderInner>
    </HeaderWrapper>
  );
}
