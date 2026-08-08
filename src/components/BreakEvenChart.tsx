import { useMemo } from 'react';
import type { Dictionary } from '../i18n';
import type { ChartPoint } from '../hooks/useMarketingCalculator';
import type { CalculatorState } from '../hooks/useMarketingCalculator';

interface BreakEvenChartProps {
  t: Dictionary;
  theme: 'light' | 'dark';
  state: CalculatorState;
  breakEven: number;
  chartData: ChartPoint[];
  formatNumber: (n: number, opts?: Intl.NumberFormatOptions) => string;
}

const WIDTH = 640;
const HEIGHT = 320;
const PAD = { top: 24, right: 24, bottom: 44, left: 64 };

export const BreakEvenChart = ({
  t,
  theme,
  state,
  breakEven,
  chartData,
  formatNumber,
}: BreakEvenChartProps) => {
  const geometry = useMemo(() => {
    const maxVolume = Math.max(...chartData.map((d) => d.volume), breakEven * 2, 100);
    const sampleVolumes = [0, maxVolume * 0.25, maxVolume * 0.5, maxVolume * 0.75, maxVolume];
    const revenues = sampleVolumes.map((v) => v * state.sellingPrice);
    const costs = sampleVolumes.map((v) => state.fixedCosts + v * state.variableCost);
    const maxY = Math.max(...revenues, ...costs, 1);

    const xScale = (v: number) =>
      PAD.left + (v / maxVolume) * (WIDTH - PAD.left - PAD.right);
    const yScale = (y: number) =>
      PAD.top + (1 - y / maxY) * (HEIGHT - PAD.top - PAD.bottom);

    const revenuePoints = [
      { x: xScale(0), y: yScale(0) },
      { x: xScale(maxVolume), y: yScale(maxVolume * state.sellingPrice) },
    ];
    const costPoints = [
      { x: xScale(0), y: yScale(state.fixedCosts) },
      {
        x: xScale(maxVolume),
        y: yScale(state.fixedCosts + maxVolume * state.variableCost),
      },
    ];

    const bevX = breakEven > 0 ? xScale(Math.min(breakEven, maxVolume)) : null;
    const bevY =
      breakEven > 0 ? yScale(breakEven * state.sellingPrice) : null;

    const xTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
      v: maxVolume * f,
      x: xScale(maxVolume * f),
    }));
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
      v: maxY * f,
      y: yScale(maxY * f),
    }));

    return { revenuePoints, costPoints, bevX, bevY, xTicks, yTicks, maxVolume, maxY };
  }, [chartData, breakEven, state]);

  const textColor = theme === 'dark' ? '#eef3ef' : '#1a2421';
  const muted = theme === 'dark' ? '#9aada3' : '#5a6b64';
  const grid = theme === 'dark' ? 'rgba(238,243,239,0.08)' : 'rgba(26,36,33,0.08)';

  const line = (pts: { x: number; y: number }[]) =>
    pts.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <section aria-labelledby="chart-heading">
      <h2 id="chart-heading" className="section-title">
        {t.sections.chart}
      </h2>
      <div className="panel">
        <div className="chart-wrap">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={t.sections.chart}>
            {geometry.yTicks.map((tick) => (
              <g key={`y-${tick.v}`}>
                <line
                  x1={PAD.left}
                  x2={WIDTH - PAD.right}
                  y1={tick.y}
                  y2={tick.y}
                  stroke={grid}
                />
                <text x={PAD.left - 8} y={tick.y + 4} textAnchor="end" fontSize="11" fill={muted}>
                  {formatCompact(tick.v)}
                </text>
              </g>
            ))}
            {geometry.xTicks.map((tick) => (
              <g key={`x-${tick.v}`}>
                <line
                  x1={tick.x}
                  x2={tick.x}
                  y1={PAD.top}
                  y2={HEIGHT - PAD.bottom}
                  stroke={grid}
                />
                <text
                  x={tick.x}
                  y={HEIGHT - PAD.bottom + 18}
                  textAnchor="middle"
                  fontSize="11"
                  fill={muted}
                >
                  {formatCompact(tick.v)}
                </text>
              </g>
            ))}

            <polyline
              fill="none"
              stroke="var(--cost)"
              strokeWidth="3"
              strokeLinecap="round"
              points={line(geometry.costPoints)}
            />
            <polyline
              fill="none"
              stroke="var(--revenue)"
              strokeWidth="3"
              strokeLinecap="round"
              points={line(geometry.revenuePoints)}
            />

            {geometry.bevX != null && geometry.bevY != null && breakEven > 0 ? (
              <g>
                <line
                  x1={geometry.bevX}
                  x2={geometry.bevX}
                  y1={PAD.top}
                  y2={HEIGHT - PAD.bottom}
                  stroke="var(--marker)"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                />
                <circle cx={geometry.bevX} cy={geometry.bevY} r="6" fill="var(--marker)" />
                <text
                  x={geometry.bevX}
                  y={PAD.top - 6}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={textColor}
                >
                  {t.chart.breakEven}: {formatNumber(breakEven)}
                </text>
              </g>
            ) : null}

            <text
              x={WIDTH / 2}
              y={HEIGHT - 6}
              textAnchor="middle"
              fontSize="12"
              fill={muted}
            >
              {t.chart.units}
            </text>
            <text
              x={16}
              y={HEIGHT / 2}
              textAnchor="middle"
              fontSize="12"
              fill={muted}
              transform={`rotate(-90 16 ${HEIGHT / 2})`}
            >
              {t.chart.dollars}
            </text>
          </svg>
        </div>
        <div className="chart-legend">
          <span>
            <span className="legend-swatch" style={{ background: 'var(--revenue)' }} />
            {t.chart.revenue}
          </span>
          <span>
            <span className="legend-swatch" style={{ background: 'var(--cost)' }} />
            {t.chart.totalCost}
          </span>
          <span>
            <span className="legend-swatch" style={{ background: 'var(--marker)' }} />
            {t.chart.breakEven}
          </span>
        </div>
      </div>
    </section>
  );
};

const formatCompact = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return String(Math.round(n));
};
