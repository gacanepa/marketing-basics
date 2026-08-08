import { useState, useMemo, useCallback } from 'react';
import {
  deriveMetrics,
  calculateAllowableVolumeDecline,
  calculateProfit,
  calculateRevenue,
  calculateTotalCost,
  type ScenarioInputs,
  type ScenarioMetrics,
} from '../utilities/marketingMath';

export type CalculatorState = ScenarioInputs;

export interface ChartPoint {
  volume: number;
  revenue: number;
  totalCost: number;
}

const cloneInputs = (inputs: ScenarioInputs): ScenarioInputs => ({ ...inputs });

export const useMarketingCalculator = (initialState: CalculatorState) => {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [baseline, setBaseline] = useState<CalculatorState>(() => cloneInputs(initialState));

  const loadProduct = useCallback((inputs: CalculatorState) => {
    const next = cloneInputs(inputs);
    setState(next);
    setBaseline(cloneInputs(next));
  }, []);

  const updateField = (field: keyof CalculatorState, value: number) => {
    if (Number.isNaN(value) || value < 0) return;
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const setAsBaseline = () => setBaseline(cloneInputs(state));

  const resetToBaseline = () => setState(cloneInputs(baseline));

  const current: ScenarioMetrics = useMemo(() => deriveMetrics(state), [state]);
  const baselineMetrics: ScenarioMetrics = useMemo(() => deriveMetrics(baseline), [baseline]);

  const allowableVolumeDecline = useMemo(
    () => calculateAllowableVolumeDecline(baselineMetrics.unitMargin, current.unitMargin),
    [baselineMetrics.unitMargin, current.unitMargin],
  );

  const chartData: ChartPoint[] = useMemo(() => {
    const maxVolume = Math.max(current.breakEven * 2, baselineMetrics.breakEven * 2, 100);
    const steps = [0, current.breakEven || maxVolume / 2, maxVolume];
    const unique = [...new Set(steps)].sort((a, b) => a - b);
    return unique.map((volume) => ({
      volume,
      revenue: calculateRevenue(state.sellingPrice, volume),
      totalCost: calculateTotalCost(state.fixedCosts, state.variableCost, volume),
    }));
  }, [state, current.breakEven, baselineMetrics.breakEven]);

  const profitAt = useCallback(
    (volume: number, source: 'current' | 'baseline' = 'current') => {
      const src = source === 'current' ? state : baseline;
      return calculateProfit(src.fixedCosts, src.variableCost, src.sellingPrice, volume);
    },
    [state, baseline],
  );

  return {
    state,
    baseline,
    updateField,
    loadProduct,
    setAsBaseline,
    resetToBaseline,
    current,
    baselineMetrics,
    allowableVolumeDecline,
    chartData,
    profitAt,
    unitMargin: current.unitMargin,
    marginPercent: current.marginPercent,
    markupPercent: current.markupPercent,
    breakEven: current.breakEven,
    breakEvenShare: current.breakEvenShare,
  };
};
