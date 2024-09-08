export function guideDate(value: number): Date {
  const date2010 = 1262300400 * 1000;
  return new Date(date2010 + (value * 1000));
}
