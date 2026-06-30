"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PeekSlide {
  label: string;
  bg: string;
}

export function PeekCarousel({ slides, auto = true }: { slides: PeekSlide[]; auto?: boolean }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);

  useEffect(() => {
    if (!auto || paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % n), 4800);
    return () => clearInterval(id);
  }, [auto, n, paused]);

  return (
    <div
      className="peek"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="peek__viewport">
        <div className="peek__track" style={{ transform: `translateX(calc(20% - ${i * 60}%))` }}>
          {slides.map((s, k) => (
            <div key={k} className={`peek__slide ${k === i ? "is-active" : ""}`}>
              <div className="peek__card" style={{ background: s.bg }}>
                <span className="peek__caption">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="peek__arrow peek__arrow--prev" onClick={() => go(-1)} aria-label="Précédent">
        <ChevronLeft size={20} />
      </button>
      <button className="peek__arrow peek__arrow--next" onClick={() => go(1)} aria-label="Suivant">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
