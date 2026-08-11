import type { FocusEvent } from 'react';

interface NumberFieldProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number | 'any';
}

export const NumberField = ({
  id,
  value,
  onChange,
  min = 0,
  step = 'any',
}: NumberFieldProps) => {
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const next = e.target.valueAsNumber;
    if (Number.isFinite(next) && next >= min && next !== value) onChange(next);
    else e.target.value = String(value);
  };

  return (
    <input
      key={value}
      id={id}
      type="number"
      min={min}
      step={step}
      defaultValue={value}
      onBlur={handleBlur}
    />
  );
};
