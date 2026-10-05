import { waterFactors, type ActivityId, type EstimateRange } from './waterFactors';

export type UsageValues = Record<ActivityId, number>;

export type ActivityResult = {
  id: ActivityId;
  label: string;
  shortLabel: string;
  category: 'ai' | 'nonAi';
  unit: string;
  usage: number;
  daily: EstimateRange;
  monthly: EstimateRange;
  midpoint: number;
};

export type WaterResults = {
  activities: ActivityResult[];
  dailyTotal: EstimateRange;
  monthlyTotal: EstimateRange;
  aiDaily: EstimateRange;
  nonAiDaily: EstimateRange;
  largestContributor: ActivityResult;
};

const addRanges = (ranges: EstimateRange[]): EstimateRange =>
  ranges.reduce(
    (total, range) => ({ low: total.low + range.low, high: total.high + range.high }),
    { low: 0, high: 0 },
  );

const multiplyRange = (range: EstimateRange, multiplier: number): EstimateRange => ({
  low: range.low * multiplier,
  high: range.high * multiplier,
});

export const createDefaultUsage = (): UsageValues =>
  waterFactors.reduce((values, factor) => {
    values[factor.id] = 0;
    return values;
  }, {} as UsageValues);

export const midpoint = (range: EstimateRange) => (range.low + range.high) / 2;

export const calculateWaterResults = (usage: UsageValues): WaterResults => {
  // Core calculation assumption: daily activity volume × editable liters-per-unit range.
  // Monthly estimates use a 30-day month so the result remains simple and transparent.
  const activities = waterFactors.map<ActivityResult>((factor) => {
    const daily = multiplyRange(factor.rangeLitersPerUnit, usage[factor.id] || 0);
    return {
      id: factor.id,
      label: factor.label,
      shortLabel: factor.shortLabel,
      category: factor.category,
      unit: factor.unit,
      usage: usage[factor.id] || 0,
      daily,
      monthly: multiplyRange(daily, 30),
      midpoint: midpoint(daily),
    };
  });

  const dailyTotal = addRanges(activities.map((activity) => activity.daily));
  const aiDaily = addRanges(activities.filter((activity) => activity.category === 'ai').map((activity) => activity.daily));
  const nonAiDaily = addRanges(activities.filter((activity) => activity.category === 'nonAi').map((activity) => activity.daily));
  const largestContributor = [...activities].sort((a, b) => b.midpoint - a.midpoint)[0] ?? activities[0];

  return {
    activities,
    dailyTotal,
    monthlyTotal: multiplyRange(dailyTotal, 30),
    aiDaily,
    nonAiDaily,
    largestContributor,
  };
};
