import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 32px 0;
`;

const Button = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: ${(p) => (p.active ? "#111827" : "#fff")};
  color: ${(p) => (p.active ? "#fff" : "#111827")};
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

type Props = {
  page: number;
  totalPage: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPage, onChange }: Props) {
  const maxVisible = 4;

  const start = Math.max(1, page - Math.floor(maxVisible / 2));
  const end = Math.min(totalPage, start + maxVisible - 1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <Wrapper>
      <Button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Prev
      </Button>

      {pages.map((p) => (
        <Button key={p} active={p === page} onClick={() => onChange(p)}>
          {p}
        </Button>
      ))}

      <Button disabled={page === totalPage} onClick={() => onChange(page + 1)}>
        Next
      </Button>
    </Wrapper>
  );
}
