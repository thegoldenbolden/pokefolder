import NextImage, { type ImageProps } from "next/image";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const blur = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;

export function Image(props: ImageProps) {
  return (
    <NextImage
      referrerPolicy="no-referrer"
      unoptimized
      sizes="(max-width:768px) 12rem, (max-width: 1280px) 18rem"
      {...props}
      src={props.src}
      alt={props.alt}
      {...((+(props.width ?? 40) >= 40 || +(props.height ?? 40) >= 40) && {
        placeholder: "blur",
        blurDataURL: blur,
      })}
    />
  );
}
