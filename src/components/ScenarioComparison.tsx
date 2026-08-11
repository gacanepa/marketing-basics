import { useMemo, useState } from 'react';
import type { Dictionary } from '../i18n';
import type { CalculatorState } from '../hooks/useMarketingCalculator';
import type { ScenarioMetrics } from '../utilities/marketingMath';

interface ScenarioComparisonProps {
  t: Dictionary;
  baseline: CalculatorState;
  current: CalculatorState;
  baselineMetrics: ScenarioMetrics;
  currentMetrics: ScenarioMetrics;
  allowableVolumeDecline: number | null;
  profitAt: (volume: number, source?: 'current' | 'baseline') => number;
  formatNumber: (n: number, opts?: Intl.NumberFormatOptions) => string;
}

interface CompareRow {
  key: string;
  label: string;
  baseline: number;
  current: number;
  format: 'currencyUnit' | 'currencyTotal' | 'percent' | 'number';
  higherIsBetter?: boolean;
}

const inputsMatch = (a: CalculatorState, b: CalculatorState) =>
  a.fixedCosts === b.fixedCosts &&
  a.variableCost === b.variableCost &&
  a.sellingPrice === b.sellingPrice &&
  a.marketSize === b.marketSize;

const UNIT_MONEY: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
};

const TOTAL_MONEY: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
};

export const ScenarioComparison = ({
  t,
  baseline,
  current,
  baselineMetrics,
  currentMetrics,
  allowableVolumeDecline,
  profitAt,
  formatNumber,
}: ScenarioComparisonProps) => {
  const isUnchanged = inputsMatch(baseline, current);

  const suggestedVolume = Math.max(
    baselineMetrics.breakEven || 0,
    currentMetrics.breakEven || 0,
    1,
  );
  const [volumeOverride, setVolumeOverride] = useState<number | null>(null);
  const compareVolume = volumeOverride ?? suggestedVolume;

  const baselineProfit = profitAt(compareVolume, 'baseline');
  const currentProfit = profitAt(compareVolume, 'current');

  const rows: CompareRow[] = useMemo(
    () => [
      {
        key: 'unitMargin',
        label: t.labels.unitMargin,
        baseline: baselineMetrics.unitMargin,
        current: currentMetrics.unitMargin,
        format: 'currencyUnit',
        higherIsBetter: true,
      },
      {
        key: 'marginPct',
        label: t.labels.marginPct,
        baseline: baselineMetrics.marginPercent,
        current: currentMetrics.marginPercent,
        format: 'percent',
        higherIsBetter: true,
      },
      {
        key: 'markupPct',
        label: t.labels.markupPct,
        baseline: baselineMetrics.markupPercent,
        current: currentMetrics.markupPercent,
        format: 'percent',
        higherIsBetter: true,
      },
      {
        key: 'bev',
        label: t.labels.bev,
        baseline: baselineMetrics.breakEven,
        current: currentMetrics.breakEven,
        format: 'number',
        higherIsBetter: false,
      },
      {
        key: 'bevShare',
        label: t.labels.bevShare,
        baseline: baselineMetrics.breakEvenShare,
        current: currentMetrics.breakEvenShare,
        format: 'percent',
        higherIsBetter: false,
      },
      {
        key: 'profit',
        label: `${t.labels.profit} @ ${formatNumber(compareVolume)}`,
        baseline: baselineProfit,
        current: currentProfit,
        format: 'currencyTotal',
        higherIsBetter: true,
      },
    ],
    [
      t,
      baselineMetrics,
      currentMetrics,
      baselineProfit,
      currentProfit,
      compareVolume,
      formatNumber,
    ],
  );

  const formatValue = (value: number, format: CompareRow['format']) => {
    if (format === 'currencyUnit') {
      return formatNumber(value, UNIT_MONEY);
    }
    if (format === 'currencyTotal') {
      return formatNumber(value, TOTAL_MONEY);
    }
    if (format === 'percent') {
      return `${formatNumber(value, { maximumFractionDigits: 2 })}%`;
    }
    return formatNumber(value);
  };
  const declinePct =
    allowableVolumeDecline != null && allowableVolumeDecline > 0
      ? formatNumber(allowableVolumeDecline, { maximumFractionDigits: 1 })
      : null;

  return (
    <section aria-labelledby="compare-heading">
      <h2 id="compare-heading" className="section-title">
        {t.sections.comparison}
      </h2>
      <div className="panel">
        <p className="hint" style={{ marginTop: 0 }}>
          {t.comparison.intro}
        </p>

        <div className="baseline-strip" aria-label={t.labels.baselineLocked}>
          <p className="baseline-strip-title">{t.labels.baselineLocked}</p>
          <dl className="baseline-strip-grid">
            <div>
              <dt>{t.labels.fixed}</dt>
              <dd>{formatNumber(baseline.fixedCosts, TOTAL_MONEY)}</dd>
            </div>
            <div>
              <dt>{t.labels.var}</dt>
              <dd>{formatNumber(baseline.variableCost, UNIT_MONEY)}</dd>
            </div>
            <div>
              <dt>{t.labels.price}</dt>
              <dd>{formatNumber(baseline.sellingPrice, UNIT_MONEY)}</dd>
            </div>
            <div>
              <dt>{t.labels.marketSize}</dt>
              <dd>{formatNumber(baseline.marketSize)}</dd>
            </div>
          </dl>
        </div>

        {isUnchanged ? (
          <div className="callout comparison-empty">{t.comparison.emptyState}</div>
        ) : (
          <>
            <div className="field" style={{ maxWidth: 280, marginBottom: '0.35rem' }}>
              <label htmlFor="compareVolume">{t.labels.compareVolume}</label>
              <input
                id="compareVolume"
                type="number"
                min={0}
                value={compareVolume}
                onChange={(e) => setVolumeOverride(Math.max(0, Number(e.target.value) || 0))}
              />
            </div>
            <p className="hint compare-volume-hint">{t.comparison.compareVolumeHint}</p>

            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">{t.labels.baseline}</th>
                  <th scope="col">{t.labels.current}</th>
                  <th scope="col">{t.labels.delta}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const delta = row.current - row.baseline;
                  const good =
                    row.higherIsBetter == null
                      ? null
                      : row.higherIsBetter
                        ? delta > 0
                        : delta < 0;
                  return (
                    <tr key={row.key}>
                      <td>{row.label}</td>
                      <td>{formatValue(row.baseline, row.format)}</td>
                      <td>{formatValue(row.current, row.format)}</td>
                      <td
                        className={
                          good === true
                            ? 'positive'
                            : good === false && delta !== 0
                              ? 'negative'
                              : undefined
                        }
                      >
                        {delta > 0 ? '+' : ''}
                        {formatValue(delta, row.format)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="bar-chart">
              {rows.slice(0, 4).map((row) => {
                const rowMax = Math.max(Math.abs(row.baseline), Math.abs(row.current), 1);
                const baselineTip = `${t.labels.baseline}: ${formatValue(row.baseline, row.format)}`;
                const currentTip = `${t.labels.current}: ${formatValue(row.current, row.format)}`;
                return (
                  <div key={row.key} className="bar-row">
                    <div className="bar-label">{row.label}</div>
                    <div className="dual-bars">
                      <div className="bar-track">
                        <div
                          className="bar-fill baseline"
                          style={{ width: `${(Math.abs(row.baseline) / rowMax) * 100}%` }}
                        >
                          {t.labels.baseline}
                        </div>
                        <span className="bar-tooltip">{baselineTip}</span>
                      </div>
                      <div className="bar-track">
                        <div
                          className="bar-fill current"
                          style={{ width: `${(Math.abs(row.current) / rowMax) * 100}%` }}
                        >
                          {t.labels.current}
                        </div>
                        <span className="bar-tooltip">{currentTip}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {declinePct ? (
              <div className="callout">
                <strong>
                  {t.labels.allowableDecline}: {declinePct}%
                </strong>
                <p style={{ margin: '0.35rem 0 0' }}>
                  {t.comparison.declineCallout.replace('{pct}', `${declinePct}%`)}
                </p>
              </div>
            ) : currentMetrics.unitMargin > baselineMetrics.unitMargin ? null : (
              <div className="callout muted">{t.comparison.needHigherMargin}</div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
