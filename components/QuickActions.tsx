"use client";

import { ArrowUp, Mail, CircleArrowOutUpRight, X } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

const actions = [
  { label: "Scroll to top", href: "#top", icon: ArrowUp },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/muhamad-rusdiana-99054b428",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rusdi.an2?stkn=dXYxNnhxZTcwNzZs&utm_source=qr",
    icon: FaInstagram,
    external: true,
  },
  { label: "Email", href: "mailto:muhamadrusdiana452@gmail.com", icon: Mail },
  {
    label: "WhatsApp",
    href: "https://wa.me/6285156248671",
    icon: FaWhatsapp,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/mrusdiana",
    icon: FaGithub,
    external: true,
  },
];

export default function QuickActions() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      className="pointer-events-none fixed right-[22px] bottom-[22px] z-[95] flex flex-col items-end gap-[11px] max-[767px]:right-[14px] max-[767px]:bottom-[22px]"
      data-open={open}
      ref={menuRef}
    >
      <div
        className={`quick-actions-menu ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
        id="quick-actions-list"
        aria-hidden={!open}
      >
        {actions.map(({ label, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="quick-actions-link"
          >
            <span>{label}</span>
            <Icon size={17} aria-hidden="true" />
          </a>
        ))}
      </div>
      <button
        type="button"
        className="pointer-events-auto grid size-[54px] cursor-pointer place-items-center rounded-full border border-white/55 bg-[#f16524] text-white shadow-[0_14px_40px_rgba(74,32,17,0.23)] transition-[transform,background] duration-200 hover:-translate-y-[3px] hover:bg-[#d9551d] focus-visible:-translate-y-[3px] focus-visible:bg-[#d9551d] max-[767px]:size-[50px]"
        aria-label={open ? "Close quick links" : "Open quick links"}
        aria-expanded={open}
        aria-controls="quick-actions-list"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? (
          <X size={23} aria-hidden="true" />
        ) : (
          <CircleArrowOutUpRight size={23} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
