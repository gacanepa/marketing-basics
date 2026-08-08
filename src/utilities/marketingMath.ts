export const calculateUnitMargin = (price: number, variableCost: number): number => {
  return price - variableCost;
};

export const calculateMarginPercentage = (unitMargin: number, price: number): number => {
  if (price === 0) return 0;
  return (unitMargin / price) * 100;
};

export const calculateMarkupPercentage = (unitMargin: number, variableCost: number): number => {
  if (variableCost === 0) return 0;
  return (unitMargin / variableCost) * 100;
};

export const calculateBreakEvenVolume = (fixedCosts: number, unitMargin: number): number => {
  if (unitMargin <= 0) return 0;
  return Math.ceil(fixedCosts / unitMargin);
};

export const calculateBreakEvenMarketShare = (breakEvenVolume: number, marketSize: number): number => {
  if (marketSize <= 0) return 0;
  return (breakEvenVolume / marketSize) * 100;
};

export const calculateSellingPrice = (cost: number, percentMargin: number): number => {
  if (percentMargin >= 100) return 0;
  return cost / (1 - percentMargin / 100);
};

/**
 * Dolan price-impact: max % volume decline that still keeps total contribution
 * equal after a margin change (newMargin / oldMargin - 1, as a percentage decline).
 * Returns a positive number meaning "volume can fall by X%" and still match old contribution.
 */
export const calculateAllowableVolumeDecline = (oldMargin: number, newMargin: number): number | null => {
  if (oldMargin <= 0 || newMargin <= 0) return null;
  if (newMargin <= oldMargin) return 0;
  return (1 - oldMargin / newMargin) * 100;
};

export const calculateContribution = (unitMargin: number, volume: number): number => {
  return unitMargin * volume;
};

export const calculateProfit = (
  fixedCosts: number,
  variableCost: number,
  sellingPrice: number,
  volume: number,
): number => {
  return volume * (sellingPrice - variableCost) - fixedCosts;
};

export const calculateTotalCost = (fixedCosts: number, variableCost: number, volume: number): number => {
  return fixedCosts + variableCost * volume;
};

export const calculateRevenue = (sellingPrice: number, volume: number): number => {
  return sellingPrice * volume;
};

export interface ScenarioInputs {
  fixedCosts: number;
  variableCost: number;
  sellingPrice: number;
  marketSize: number;
}

export interface ScenarioMetrics {
  unitMargin: number;
  marginPercent: number;
  markupPercent: number;
  breakEven: number;
  breakEvenShare: number;
}

export const deriveMetrics = (inputs: ScenarioInputs): ScenarioMetrics => {
  const unitMargin = calculateUnitMargin(inputs.sellingPrice, inputs.variableCost);
  const marginPercent = calculateMarginPercentage(unitMargin, inputs.sellingPrice);
  const markupPercent = calculateMarkupPercentage(unitMargin, inputs.variableCost);
  const breakEven = calculateBreakEvenVolume(inputs.fixedCosts, unitMargin);
  const breakEvenShare = calculateBreakEvenMarketShare(breakEven, inputs.marketSize);
  return { unitMargin, marginPercent, markupPercent, breakEven, breakEvenShare };
};
