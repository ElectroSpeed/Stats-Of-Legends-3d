"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export function Select({
  options,
  defaultValue,
  onChange,
  ariaLabel,
}: {
  options: SelectOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? options[0]?.value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="select-c" ref={ref}>
      <button
        type="button"
        className="select-c__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{current?.label}</span>
        <ChevronDown size={16} className="select-c__chev" aria-hidden />
      </button>
      {open && (
        <ul className="select-c__menu" role="listbox">
          {options.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`select-c__opt ${o.value === value ? "is-sel" : ""}`}
              onClick={() => {
                setValue(o.value);
                onChange?.(o.value);
                setOpen(false);
              }}
            >
              {o.label}
              {o.value === value && <Check size={15} aria-hidden />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
