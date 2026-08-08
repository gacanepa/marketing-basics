import { useEffect, useMemo } from 'react';
import { useAppConfig } from '../contexts/useAppConfig';
import { dictionary } from '../i18n';
import { useMarketingCalculator } from '../hooks/useMarketingCalculator';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/product';
import { DefinitionsPanel } from './DefinitionsPanel';
import { ProductManager } from './ProductManager';
import { CalculatorInputs } from './CalculatorInputs';
import { BreakEvenChart } from './BreakEvenChart';
import { ScenarioComparison } from './ScenarioComparison';

const toInputs = (product: Product) => ({
  fixedCosts: product.fixedCosts,
  variableCost: product.variableCost,
  sellingPrice: product.sellingPrice,
  marketSize: product.marketSize,
});

export const MarketingDashboard = () => {
  const { lang, theme, setLang, setTheme } = useAppConfig();
  const t = dictionary[lang];
  const {
    allProducts,
    activeProduct,
    activeId,
    selectProduct,
    createProduct,
    deleteProduct,
  } = useProducts();

  const {
    state,
    baselineMetrics,
    current,
    breakEven,
    chartData,
    allowableVolumeDecline,
    updateField,
    loadProduct,
    setAsBaseline,
    profitAt,
  } = useMarketingCalculator(toInputs(activeProduct));

  useEffect(() => {
    loadProduct(toInputs(activeProduct));
  }, [activeId, activeProduct, loadProduct]);

  const formatNumber = useMemo(() => {
    const locale = lang === 'es-419' ? 'es-419' : 'en-US';
    return (n: number, opts?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(locale, opts).format(n);
  }, [lang]);

  const productLabel = (product: Product) => {
    if (product.nameKey === 'ebike') return t.product.ebike;
    return product.name || t.product.custom;
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <p className="brand">{t.brand}</p>
          <p className="subtitle">{t.subtitle}</p>
        </div>
        <div className="header-controls">
          <div className="seg-control" role="group" aria-label="Theme">
            <button
              type="button"
              aria-pressed={theme === 'light'}
              onClick={() => setTheme('light')}
            >
              {t.themeLight}
            </button>
            <button
              type="button"
              aria-pressed={theme === 'dark'}
              onClick={() => setTheme('dark')}
            >
              {t.themeDark}
            </button>
          </div>
          <div className="seg-control" role="group" aria-label="Language">
            <button
              type="button"
              aria-pressed={lang === 'en-US'}
              onClick={() => setLang('en-US')}
            >
              {t.langEn}
            </button>
            <button
              type="button"
              aria-pressed={lang === 'es-419'}
              onClick={() => setLang('es-419')}
            >
              {t.langEs}
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <DefinitionsPanel t={t} />

        <ProductManager
          t={t}
          products={allProducts}
          activeId={activeId}
          onSelect={selectProduct}
          onCreate={createProduct}
          onDelete={deleteProduct}
          productLabel={productLabel}
        />

        <div className="layout-split">
          <CalculatorInputs
            t={t}
            state={state}
            metrics={current}
            onUpdate={updateField}
            onSetBaseline={setAsBaseline}
            onReset={() => loadProduct(toInputs(activeProduct))}
            formatNumber={formatNumber}
          />
          <BreakEvenChart
            t={t}
            theme={theme}
            state={state}
            breakEven={breakEven}
            chartData={chartData}
            formatNumber={formatNumber}
          />
        </div>

        <ScenarioComparison
          key={activeId}
          t={t}
          baselineMetrics={baselineMetrics}
          currentMetrics={current}
          allowableVolumeDecline={allowableVolumeDecline}
          profitAt={profitAt}
          formatNumber={formatNumber}
        />
      </main>
    </div>
  );
};
