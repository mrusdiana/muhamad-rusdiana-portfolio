"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  window.addEventListener("portfolio-theme-change", onChange);
  return () => window.removeEventListener("portfolio-theme-change", onChange);
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export default function ThemeToggle({
  variant = "default",
}: {
  variant?: "default" | "case";
}) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // The theme still works when browser storage is unavailable.
    }
    window.dispatchEvent(new Event("portfolio-theme-change"));
  };

  return (
    <button
      type="button"
      className={`grid shrink-0 cursor-pointer place-items-center rounded-full border backdrop-blur-[18px] transition-[background,transform,border-color] duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ffb880] ${
        variant === "case"
          ? "size-[37px] border-[color-mix(in_srgb,var(--case-ink)_24%,transparent)] bg-[color-mix(in_srgb,var(--case-ink)_7%,transparent)] text-[var(--case-ink)] hover:bg-[color-mix(in_srgb,var(--case-ink)_15%,transparent)] focus-visible:bg-[color-mix(in_srgb,var(--case-ink)_15%,transparent)]"
          : "size-[42px] border-white/45 bg-white/20 text-white hover:border-white/80 hover:bg-white/35 focus-visible:border-white/80 focus-visible:bg-white/35 [.site-header.is-scrolled_&]:bg-[rgba(255,255,255,0.18)] dark:[.site-header.is-scrolled_&]:bg-[rgba(255,255,255,0.09)] max-[767px]:size-[43px]"
      }`}
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
