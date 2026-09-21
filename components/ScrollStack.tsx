"use client";

import Lenis from "lenis";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemStackDistance?: number;
  baseScale?: number;
};

export function ScrollStackItem({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <div
      className="scroll-stack-card"
      style={{ top: `${92 + index * 22}px`, zIndex: index + 1 }}
    >
      {children}
    </div>
  );
}

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 90,
  itemStackDistance = 22,
  baseScale = 0.88,
}: ScrollStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = Array.from(
      stack.querySelectorAll<HTMLElement>(".scroll-stack-card")
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lenis: Lenis | undefined;

    const update = () => {
      frame = 0;
      if (reduceMotion.matches) {
        cards.forEach((card) => {
          card.style.transform = "";
        });
        return;
      }
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;
        const pinTop =
          Math.min(100, window.innerHeight * 0.12) + index * itemStackDistance;
        const distance = Math.max(180, window.innerHeight * 0.28);
        const progress = Math.max(
          0,
          Math.min(
            1,
            (pinTop + distance - next.getBoundingClientRect().top) / distance
          )
        );
        const scale =
          1 -
          progress *
            (1 - baseScale) *
            ((cards.length - 1 - index) / (cards.length - 1));
        card.style.transform = `scale(${scale.toFixed(3)})`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (!reduceMotion.matches) {
      lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
      lenis.on("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduceMotion.addEventListener("change", onScroll);
    update();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduceMotion.removeEventListener("change", onScroll);
      lenis?.destroy();
    };
  }, [itemStackDistance, baseScale]);

  return (
    <div
      ref={stackRef}
      className={`scroll-stack ${className}`.trim()}
      style={
        {
          "--item-distance": `${itemDistance}px`,
          "--stack-distance": `${itemStackDistance}px`,
        } as CSSProperties
      }
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  );
}
