import { Point, Range } from "@/app/(admin)/charts/apex/data";

/**
 * Utilit function to generate day wise series
 * @param {*} baseval
 * @param {*} count
 * @param {*} yrange
 */
const generateDayWiseTimeSeries = (
  baseval: number,
  count: number,
  yrange: Range
): Point[] => {
  let i = 0;
  const series: Point[] = [];
  while (i < count) {
    const x = baseval;
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({ x, y });
    baseval += 86400000;
    i++;
  }
  return series;
};

export { generateDayWiseTimeSeries };
