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
    <section className="case-gallery" aria-label={`${name} screenshot gallery`}>
      <div className="case-gallery-top">
        <span>Project Gallery</span>
        <span>{String(images.length).padStart(2, "0")} screens</span>
      </div>
      <div className="case-gallery-grid">
        {visibleImages.map((src, index) => {
          const more = !expanded && index === 4 && images.length > 5;
          return (
            <button
              className={`case-gallery-frame ${
                index === 0 ? "case-gallery-frame--featured" : ""
              } ${more ? "case-gallery-frame--more" : ""}`}
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
                <span className="case-gallery-more">
                  +{images.length - 5}
                  <small>View more</small>
                </span>
              )}
            </button>
          );
        })}
      </div>
      {expanded && images.length > 5 && (
        <button
          className="case-gallery-less"
          type="button"
          onClick={() => setExpanded(false)}
        >
          Show fewer screenshots
        </button>
      )}
      <dialog
        className="case-image-dialog"
        ref={dialogRef}
        aria-label={`${name} screenshot preview`}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        {selected !== null && (
          <div className="case-image-dialog-content">
            <button
              type="button"
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
