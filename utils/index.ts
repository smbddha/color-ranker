export type RGB = {
  r: number;
  g: number;
  b: number;
};

export function numberToRGB(n: number): RGB {
  const b = n & 255;
  const g = (n >> 8) & 255;
  const r = (n >> 16) & 255;

  return { r, g, b };
}

export function luminance({ r, g, b }: RGB): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
