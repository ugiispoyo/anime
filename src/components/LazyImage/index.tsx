import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type T_Image = React.ImgHTMLAttributes<HTMLImageElement> & {
  placeholderSrc?: string;
  rootMargin?: string;
  threshold?: number;
  fadeInMs?: number;
  blurPx?: number;
  heigthPlaceholder?: string | number;
  widthPlaceholder?: string | number;
};

const Wrapper = styled.div<{
  height?: string | number;
  width?: string | number;
}>`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ height }) =>
    height !== undefined &&
    `
    height: ${typeof height === "number" ? `${height}px` : height};
  `}

  ${({ width }) =>
    width !== undefined &&
    `
    width: ${typeof width === "number" ? `${width}px` : width};
  `}
`;

const Placeholder = styled.span<{
  height?: string | number;
  width?: string | number;
  blurPx: number;
  placeholderSrc?: string;
}>`
  position: absolute;
  inset: 0;

  height: ${({ height }) =>
    typeof height === "number" ? `${height}px` : height || "100px"};

  width: ${({ width }) =>
    typeof width === "number" ? `${width}px` : width || "300px"};

  background: ${({ placeholderSrc }) =>
    placeholderSrc ? `url(${placeholderSrc})` : "#7f9ea16e"};

  background-size: cover;
  background-position: center;
  filter: blur(${({ blurPx }) => blurPx}px);
`;

const StyledImg = styled.img<{
  loaded: boolean;
  failed: boolean;
  fadeInMs: number;
}>`
  opacity: ${({ loaded, failed }) => (loaded && !failed ? 1 : 0)};
  transition: opacity ${({ fadeInMs }) => fadeInMs}ms ease;
`;

export default function Image({
  src,
  alt,
  placeholderSrc,
  rootMargin = "300px",
  threshold = 0.01,
  fadeInMs = 250,
  blurPx = 18,
  style,
  onLoad,
  onError,
  widthPlaceholder,
  heigthPlaceholder,
  ...imgProps
}: T_Image) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin, threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold]);

  const wrapProps = { ...imgProps };

  delete imgProps?.height;
  delete imgProps?.width;

  return (
    <Wrapper
      height={
        !loaded && !failed
          ? (heigthPlaceholder ?? wrapProps?.height)
          : wrapProps?.height
      }
      width={
        !loaded && !failed
          ? (widthPlaceholder ?? wrapProps?.width)
          : wrapProps?.width
      }
    >
      {!loaded && !failed && (
        <Placeholder
          height={heigthPlaceholder ?? wrapProps?.height}
          width={widthPlaceholder ?? wrapProps?.width}
          blurPx={blurPx}
          placeholderSrc={placeholderSrc}
        />
      )}

      <StyledImg
        ref={ref}
        src={shouldLoad ? (src as string) : undefined}
        alt={alt ?? ""}
        decoding="async"
        loading="lazy"
        loaded={loaded}
        failed={failed}
        fadeInMs={fadeInMs}
        onLoad={(e) => {
          setLoaded(true);
          setFailed(false);
          onLoad?.(e);
        }}
        onError={(e) => {
          setFailed(true);
          onError?.(e);
        }}
        style={style}
        {...imgProps}
      />
    </Wrapper>
  );
}
