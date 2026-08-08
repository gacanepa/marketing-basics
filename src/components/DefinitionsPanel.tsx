import type { Dictionary } from '../i18n';

interface DefinitionsPanelProps {
  t: Dictionary;
}

export const DefinitionsPanel = ({ t }: DefinitionsPanelProps) => {
  const items = [
    {
      title: t.concepts.fixedCosts,
      body: t.concepts.fixedCostDef,
    },
    {
      title: t.concepts.variableCosts,
      body: t.concepts.varCostDef,
    },
    {
      title: t.concepts.unitMargin,
      body: t.concepts.marginDef,
      formula: t.concepts.marginFormula,
    },
    {
      title: t.concepts.percentMargin,
      body: t.concepts.marginPercentDef,
      formula: t.concepts.marginPercentFormula,
    },
    {
      title: t.concepts.percentMarkup,
      body: t.concepts.markupDef,
      formula: t.concepts.markupFormula,
    },
    {
      title: t.concepts.bev,
      body: t.concepts.bevDef,
      formula: t.concepts.bevFormula,
    },
    {
      title: t.concepts.bevShare,
      body: t.concepts.bevShareDef,
      formula: t.concepts.bevShareFormula,
    },
    {
      title: t.concepts.priceImpact,
      body: t.concepts.priceImpactDef,
      formula: t.concepts.allowableDeclineFormula,
    },
  ];

  const mid = Math.ceil(items.length / 2);
  const columns = [items.slice(0, mid), items.slice(mid)];

  return (
    <section aria-labelledby="definitions-heading">
      <h2 id="definitions-heading" className="section-title">
        {t.sections.definitions}
      </h2>
      <div className="panel definitions-grid">
        {columns.map((col, i) => (
          <div key={i}>
            {col.map((item) => (
              <article key={item.title} className="definition-item">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.formula ? <div className="formula">{item.formula}</div> : null}
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
