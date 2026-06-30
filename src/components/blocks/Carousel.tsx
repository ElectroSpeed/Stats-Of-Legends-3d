"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Slide {
  label: string;
  bg: string;
}

export function Carousel({
  slides,
  auto = true,
  loop = true,
}: {
  slides: Slide[];
  auto?: boolean;
  loop?: boolean;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const clamp = (x: number) => Math.max(0, Math.min(n - 1, x));
  const go = (d: number) => setI((prev) => (loop ? (prev + d + n) % n : clamp(prev + d)));

  useEffect(() => {
    if (!auto || paused) return;
    const id = setInterval(
      () => setI((p) => (loop ? (p + 1) % n : p + 1 >= n ? p : p + 1)),
      4500,
    );
    return () => clearInterval(id);
  }, [auto, n, paused, loop]);

  const atStart = !loop && i === 0;
  const atEnd = !loop && i === n - 1;

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel__viewport">
        <div className="carousel__track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {slides.map((s, k) => (
            <div className="carousel__slide" key={k} style={{ background: s.bg }}>
              <span className="carousel__caption">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="carousel__arrow carousel__arrow--prev"
        onClick={() => go(-1)}
        disabled={atStart}
        aria-label="Précédent"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="carousel__arrow carousel__arrow--next"
        onClick={() => go(1)}
        disabled={atEnd}
        aria-label="Suivant"
      >
        <ChevronRight size={20} />
      </button>
      <div className="carousel__dots">
        {slides.map((_, k) => (
          <button
            key={k}
            className={`carousel__dot ${k === i ? "carousel__dot--active" : ""}`}
            onClick={() => setI(k)}
            aria-label={`Aller au slide ${k + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
