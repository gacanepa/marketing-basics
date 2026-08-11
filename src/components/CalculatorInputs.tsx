import type { Dictionary } from '../i18n';
import type { CalculatorState } from '../hooks/useMarketingCalculator';
import type { ScenarioMetrics } from '../utilities/marketingMath';
import { NumberField } from './NumberField';

interface CalculatorInputsProps {
  t: Dictionary;
  state: CalculatorState;
  metrics: ScenarioMetrics;
  isUnchanged: boolean;
  onUpdate: (field: keyof CalculatorState, value: number) => void;
  onSetBaseline: () => void;
  onReset: () => void;
  formatNumber: (n: number, opts?: Intl.NumberFormatOptions) => string;
}

export const CalculatorInputs = ({
  t,
  state,
  metrics,
  isUnchanged,
  onUpdate,
  onSetBaseline,
  onReset,
  formatNumber,
}: CalculatorInputsProps) => {
  return (
    <section aria-labelledby="simulator-heading">
      <h2 id="simulator-heading" className="section-title">
        {t.sections.simulator}
      </h2>
      <div className="panel">
        <div className="field-grid">
          <div className="field">
            <label htmlFor="fixedCosts">{t.labels.fixed}</label>
            <NumberField
              id="fixedCosts"
              value={state.fixedCosts}
              step="any"
              onChange={(value) => onUpdate('fixedCosts', value)}
            />
          </div>
          <div className="field">
            <label htmlFor="variableCost">{t.labels.var}</label>
            <NumberField
              id="variableCost"
              value={state.variableCost}
              step="any"
              onChange={(value) => onUpdate('variableCost', value)}
            />
          </div>
          <div className="field">
            <label htmlFor="sellingPrice">{t.labels.price}</label>
            <NumberField
              id="sellingPrice"
              value={state.sellingPrice}
              step="any"
              onChange={(value) => onUpdate('sellingPrice', value)}
            />
          </div>
          <div className="field">
            <label htmlFor="marketSize">{t.labels.marketSize}</label>
            <NumberField
              id="marketSize"
              value={state.marketSize}
              step={1}
              onChange={(value) => onUpdate('marketSize', value)}
            />
          </div>
        </div>

        <div className="metrics-strip">
          <div className="metric">
            <span className="label">{t.labels.unitMargin}</span>
            <span className="value">
              {formatNumber(metrics.unitMargin, { style: 'currency', currency: 'USD' })}
            </span>
          </div>
          <div className="metric">
            <span className="label">{t.labels.marginPct}</span>
            <span className="value">
              {formatNumber(metrics.marginPercent, { maximumFractionDigits: 1 })}%
            </span>
          </div>
          <div className="metric">
            <span className="label">{t.labels.markupPct}</span>
            <span className="value">
              {formatNumber(metrics.markupPercent, { maximumFractionDigits: 1 })}%
            </span>
          </div>
          <div className="metric">
            <span className="label">{t.labels.bev}</span>
            <span className="value">
              {metrics.unitMargin > 0 ? formatNumber(metrics.breakEven) : '—'}
            </span>
          </div>
          <div className="metric">
            <span className="label">{t.labels.bevShare}</span>
            <span className="value">
              {metrics.unitMargin > 0 && state.marketSize > 0
                ? `${formatNumber(metrics.breakEvenShare, { maximumFractionDigits: 2 })}%`
                : '—'}
            </span>
          </div>
        </div>

        {metrics.unitMargin <= 0 ? <p className="hint">{t.empty.noBev}</p> : null}

        <div className="actions-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSetBaseline}
            disabled={isUnchanged}
            title={isUnchanged ? t.actions.setBaselineHint : undefined}
          >
            {t.actions.setBaseline}
          </button>
          <button type="button" className="btn" onClick={onReset}>
            {t.actions.resetToProduct}
          </button>
        </div>
        <p className="hint">{t.actions.setBaselineHint}</p>
      </div>
    </section>
  );
};
