"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ProjectGallery({
  name,
  images,
}: {
  name: string;
  images: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleImages = expanded ? images : images.slice(0, 5);

  useEffect(() => {
    if (selected !== null && !dialogRef.current?.open)
      dialogRef.current?.showModal();
  }, [selected]);

  return (
    <section
      className="mx-auto w-[min(calc(100%-48px),1120px)] pt-3 pb-[25px] max-[767px]:w-[calc(100%-32px)]"
      aria-label={`${name} screenshot gallery`}
    >
      <div className="mb-[13px] flex justify-between gap-[15px] text-[0.65rem] font-extrabold tracking-[0.08em] text-[var(--case-accent)] uppercase">
        <span>Project Gallery</span>
        <span>{String(images.length).padStart(2, "0")} screens</span>
      </div>
      <div className="grid grid-cols-3 items-stretch gap-[10px] max-[767px]:grid-cols-2 max-[767px]:gap-[7px]">
        {visibleImages.map((src, index) => {
          const more = !expanded && index === 4 && images.length > 5;
          return (
            <button
              className={`group relative block h-[168px] cursor-pointer overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--case-ink)_14%,transparent)] bg-[color-mix(in_srgb,var(--case-accent)_8%,var(--case-bg))] p-0 max-[767px]:h-[120px] max-[767px]:rounded-[9px] [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top [&>img]:transition-transform [&>img]:duration-220 hover:[&>img]:scale-[1.035] focus-visible:[&>img]:scale-[1.035] ${
                index === 0
                  ? "col-span-2 h-[218px] max-[767px]:h-[190px] [&>img]:object-contain"
                  : ""
              } ${
                more
                  ? "after:absolute after:inset-0 after:bg-[rgba(14,14,17,0.58)] after:content-['']"
                  : ""
              }`}
              type="button"
              key={src}
              aria-label={
                more
                  ? `Show ${images.length - 5} more ${name} screenshots`
                  : `Enlarge ${name} screenshot ${index + 1}`
              }
              onClick={() => (more ? setExpanded(true) : setSelected(index))}
            >
              <Image
                src={src}
                alt={`${name} screenshot ${index + 1}`}
                width={1440}
                height={800}
                priority={index === 0}
                sizes={
                  index === 0
                    ? "(max-width: 767px) 95vw, 60vw"
                    : "(max-width: 767px) 48vw, 30vw"
                }
              />
              {more && (
                <span className="absolute inset-0 z-[1] flex flex-col items-center justify-center text-[2rem] font-[780] text-white">
                  +{images.length - 5}
                  <small className="text-[0.73rem] font-[750] tracking-[0.04em]">
                    View more
                  </small>
                </span>
              )}
            </button>
          );
        })}
      </div>
      {expanded && images.length > 5 && (
        <button
          className="mt-[14px] ml-auto block cursor-pointer rounded-full border border-[color-mix(in_srgb,var(--case-ink)_25%,transparent)] bg-transparent px-[13px] py-[9px] text-[0.72rem] font-[750] text-[var(--case-ink)]"
          type="button"
          onClick={() => setExpanded(false)}
        >
          Show fewer screenshots
        </button>
      )}
      <dialog
        className="fixed inset-0 m-auto max-h-[90vh] w-[min(94vw,1300px)] max-w-none overflow-visible border-0 bg-transparent p-0 backdrop:bg-[rgba(10,9,9,0.85)] backdrop:backdrop-blur-[8px]"
        ref={dialogRef}
        aria-label={`${name} screenshot preview`}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        {selected !== null && (
          <div className="relative overflow-hidden rounded-[14px] bg-[#121212] [&>img]:block [&>img]:h-auto [&>img]:max-h-[88vh] [&>img]:w-full [&>img]:object-contain">
            <button
              type="button"
              className="absolute top-[10px] right-[10px] z-[1] grid size-9 cursor-pointer place-items-center rounded-full border border-white/60 bg-[rgba(20,20,20,0.72)] text-white"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close screenshot preview"
            >
              <X size={21} aria-hidden="true" />
            </button>
            <Image
              src={images[selected]}
              alt={`${name} screenshot ${selected + 1}`}
              width={1440}
              height={800}
              sizes="90vw"
            />
          </div>
        )}
      </dialog>
    </section>
  );
}
