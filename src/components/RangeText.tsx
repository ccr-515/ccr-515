import type { EstimateRange } from '../data/waterFactors';

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en', {
    maximumFractionDigits: value >= 10 ? 0 : 2,
    minimumFractionDigits: value > 0 && value < 1 ? 2 : 0,
  }).format(value);

export function formatRange(range: EstimateRange, suffix = 'L') {
  return `${formatNumber(range.low)}–${formatNumber(range.high)} ${suffix}`;
}

type RangeTextProps = {
  range: EstimateRange;
  suffix?: string;
  className?: string;
};

export function RangeText({ range, suffix = 'L', className }: RangeTextProps) {
  return <span className={className}>{formatRange(range, suffix)}</span>;
}
