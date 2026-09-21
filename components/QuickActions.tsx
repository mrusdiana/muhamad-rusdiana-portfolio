"use client";

import { ArrowUp, Mail, CircleArrowOutUpRight, X } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
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
    <div className={`quick-actions ${open ? "is-open" : ""}`} ref={menuRef}>
      <div
        className="quick-actions-list"
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
          >
            <span>{label}</span>
            <Icon size={18} aria-hidden="true" />
          </a>
        ))}
      </div>
      <button
        type="button"
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
