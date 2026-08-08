import { useState, type FormEvent } from 'react';
import type { Dictionary } from '../i18n';
import type { Product } from '../types/product';

interface ProductManagerProps {
  t: Dictionary;
  products: Product[];
  activeId: string;
  onSelect: (id: string) => void;
  onCreate: (product: {
    name: string;
    fixedCosts: number;
    variableCost: number;
    sellingPrice: number;
    marketSize: number;
  }) => void;
  onDelete: (id: string) => void;
  productLabel: (product: Product) => string;
}

export const ProductManager = ({
  t,
  products,
  activeId,
  onSelect,
  onCreate,
  onDelete,
  productLabel,
}: ProductManagerProps) => {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [fixedCosts, setFixedCosts] = useState(100_000);
  const [variableCost, setVariableCost] = useState(50);
  const [sellingPrice, setSellingPrice] = useState(100);
  const [marketSize, setMarketSize] = useState(500_000);

  const active = products.find((p) => p.id === activeId);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreate({
      name: trimmed,
      fixedCosts,
      variableCost,
      sellingPrice,
      marketSize,
    });
    setName('');
    setCreating(false);
  };

  return (
    <section aria-labelledby="product-heading">
      <h2 id="product-heading" className="section-title">
        {t.sections.product}
      </h2>
      <div className="panel">
        <div className="product-row">
          <div className="field">
            <label htmlFor="product-select">{t.product.select}</label>
            <select
              id="product-select"
              value={activeId}
              onChange={(e) => onSelect(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {productLabel(p)}
                </option>
              ))}
            </select>
          </div>
          <div className="actions-row" style={{ marginTop: 0 }}>
            <button type="button" className="btn btn-primary" onClick={() => setCreating(true)}>
              {t.product.new}
            </button>
            {active && !active.isBuiltin ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(active.id)}
              >
                {t.product.delete}
              </button>
            ) : null}
          </div>
        </div>
        {active?.nameKey === 'ebike' ? <p className="hint">{t.product.ebikeHint}</p> : null}

        {creating ? (
          <form className="create-form" onSubmit={handleSubmit}>
            <div className="field full">
              <label htmlFor="new-name">{t.product.name}</label>
              <input
                id="new-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="field">
              <label htmlFor="new-fixed">{t.labels.fixed}</label>
              <input
                id="new-fixed"
                type="number"
                min={0}
                value={fixedCosts}
                onChange={(e) => setFixedCosts(Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="new-var">{t.labels.var}</label>
              <input
                id="new-var"
                type="number"
                min={0}
                value={variableCost}
                onChange={(e) => setVariableCost(Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="new-price">{t.labels.price}</label>
              <input
                id="new-price"
                type="number"
                min={0}
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="new-market">{t.labels.marketSize}</label>
              <input
                id="new-market"
                type="number"
                min={0}
                value={marketSize}
                onChange={(e) => setMarketSize(Number(e.target.value))}
              />
            </div>
            <div className="actions-row full">
              <button type="submit" className="btn btn-primary">
                {t.product.create}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setCreating(false)}>
                {t.product.cancel}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </section>
  );
};
