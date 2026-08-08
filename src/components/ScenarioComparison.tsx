import { useMemo, useState } from 'react';
import type { Dictionary } from '../i18n';
import type { ScenarioMetrics } from '../utilities/marketingMath';

interface ScenarioComparisonProps {
  t: Dictionary;
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
  format: 'currency' | 'percent' | 'number';
  higherIsBetter?: boolean;
}

export const ScenarioComparison = ({
  t,
  baselineMetrics,
  currentMetrics,
  allowableVolumeDecline,
  profitAt,
  formatNumber,
}: ScenarioComparisonProps) => {
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
        format: 'currency',
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
        format: 'currency',
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
    if (format === 'currency') {
      return formatNumber(value, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    }
    if (format === 'percent') {
      return `${formatNumber(value, { maximumFractionDigits: 2 })}%`;
    }
    return formatNumber(value);
  };

  const maxAbs = Math.max(
    ...rows.flatMap((r) => [Math.abs(r.baseline), Math.abs(r.current)]),
    1,
  );

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

        <div className="field" style={{ maxWidth: 280, marginBottom: '1rem' }}>
          <label htmlFor="compareVolume">{t.labels.compareVolume}</label>
          <input
            id="compareVolume"
            type="number"
            min={0}
            value={compareVolume}
            onChange={(e) => setVolumeOverride(Math.max(0, Number(e.target.value) || 0))}
          />
        </div>

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
                  <td className={good === true ? 'positive' : good === false && delta !== 0 ? 'negative' : undefined}>
                    {delta > 0 ? '+' : ''}
                    {formatValue(delta, row.format)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="bar-chart" aria-hidden="true">
          {rows.slice(0, 4).map((row) => (
            <div key={row.key} className="bar-row">
              <div className="bar-label">{row.label}</div>
              <div className="dual-bars">
                <div className="bar-track">
                  <div
                    className="bar-fill baseline"
                    style={{ width: `${(Math.abs(row.baseline) / maxAbs) * 100}%` }}
                  >
                    {t.labels.baseline}
                  </div>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill current"
                    style={{ width: `${(Math.abs(row.current) / maxAbs) * 100}%` }}
                  >
                    {t.labels.current}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {declinePct ? (
          <div className="callout">
            <strong>{t.labels.allowableDecline}: {declinePct}%</strong>
            <p style={{ margin: '0.35rem 0 0' }}>
              {t.comparison.declineCallout.replace('{pct}', `${declinePct}%`)}
            </p>
          </div>
        ) : currentMetrics.unitMargin > baselineMetrics.unitMargin ? null : (
          <div className="callout muted">{t.comparison.needHigherMargin}</div>
        )}
      </div>
    </section>
  );
};
