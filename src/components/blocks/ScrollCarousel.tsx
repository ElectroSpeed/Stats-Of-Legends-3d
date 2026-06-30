"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Carrousel SCROLLABLE : on parcourt les éléments à la souris
 * (drag-to-scroll + molette horizontale) ou via les flèches.
 * Non infini par nature (conteneur de défilement, s'arrête aux bords).
 */
export function ScrollCarousel({
  children,
  step = 300,
}: {
  children: React.ReactNode;
  step?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  // Molette verticale -> défilement horizontal (sans scroller la page).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      // Laisse la page scroller si on est déjà au bord dans ce sens.
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.classList.add("is-dragging");
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
    ref.current?.classList.remove("is-dragging");
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const scrollBy = (dir: number) => ref.current?.scrollBy({ left: dir * step, behavior: "smooth" });

  return (
    <div className="scarousel">
      <button
        className="scarousel__arrow scarousel__arrow--prev"
        onClick={() => scrollBy(-1)}
        aria-label="Précédent"
      >
        <ChevronLeft size={20} />
      </button>
      <div
        className="scarousel__track"
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>
      <button
        className="scarousel__arrow scarousel__arrow--next"
        onClick={() => scrollBy(1)}
        aria-label="Suivant"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
