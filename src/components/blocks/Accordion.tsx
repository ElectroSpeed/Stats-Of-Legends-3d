"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="accordion">
      {items.map((it, k) => (
        <div key={k} className={`accordion__item ${open === k ? "accordion__item--open" : ""}`}>
          <button
            className="accordion__head"
            aria-expanded={open === k}
            onClick={() => setOpen(open === k ? null : k)}
          >
            {it.q}
            <ChevronDown size={18} className="accordion__chev" />
          </button>
          {open === k && <div className="accordion__body">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}
