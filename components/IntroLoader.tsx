"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./IntroLoader.module.css";

const STORAGE_KEY = "portfolio-intro-seen";
const GREETINGS = ["Hello", "Halo", "こんにちは", "Hola", "Bonjour"];
const GREETING_MS = 650;
const NAME_MS = 1400;
const EXIT_MS = 950;

type Phase = "greeting" | "name" | "exit" | "done";

// Runs while the HTML is still parsing, before React hydrates, so returning
// visitors never see a flash of the overlay and first-time visitors can't
// scroll the page underneath it.
const bootScript = `try{var d=document.documentElement;if(sessionStorage.getItem("${STORAGE_KEY}")){d.dataset.intro="skip"}else{d.dataset.intro="playing"}}catch(e){document.documentElement.dataset.intro="skip"}`;

function Mark() {
  return (
    <span className={styles.mark} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export default function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("greeting");
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  const finish = useCallback(() => {
    setPhase("done");
    delete document.documentElement.dataset.intro;
  }, []);

  const exit = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setProgress(100);
    setPhase("exit");
    timers.current.push(window.setTimeout(finish, EXIT_MS));
  }, [finish]);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "playing") {
      // Already seen this session (the boot script marked it), so stay hidden.
      const skip = window.setTimeout(finish, 0);
      return () => window.clearTimeout(skip);
    }

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // The intro still plays when browser storage is unavailable.
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const greetingCount = reduceMotion ? 1 : GREETINGS.length;
    const nameAt = greetingCount * GREETING_MS + (reduceMotion ? 300 : 0);
    const total = nameAt + NAME_MS;
    const queue = timers.current;

    for (let i = 1; i < greetingCount; i += 1) {
      queue.push(window.setTimeout(() => setIndex(i), i * GREETING_MS));
    }
    queue.push(window.setTimeout(() => setPhase("name"), nameAt));
    queue.push(window.setTimeout(exit, total));

    const start = performance.now();
    const ticker = window.setInterval(() => {
      const value = Math.min(
        100,
        Math.round(((performance.now() - start) / total) * 100),
      );
      setProgress(value);
      if (value >= 100) window.clearInterval(ticker);
    }, 40);

    // Keep wheel/touch scrolling (including Lenis) from moving the page
    // underneath while the intro is on screen.
    const block = (event: Event) => {
      if (root.dataset.intro !== "playing") return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") exit();
    };
    window.addEventListener("wheel", block, { capture: true, passive: false });
    window.addEventListener("touchmove", block, {
      capture: true,
      passive: false,
    });
    window.addEventListener("keydown", onKey);

    return () => {
      queue.forEach(window.clearTimeout);
      window.clearInterval(ticker);
      window.removeEventListener("wheel", block, { capture: true });
      window.removeEventListener("touchmove", block, { capture: true });
      window.removeEventListener("keydown", onKey);
    };
  }, [exit, finish]);

  if (phase === "done") return null;

  const word = phase === "greeting" ? GREETINGS[index] : "I'm Rusdiana.";

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <noscript>
        <style>{`.${styles.overlay}{display:none}`}</style>
      </noscript>
      <div
        className={`${styles.overlay} ${phase === "exit" ? styles.isExiting : ""}`}
        aria-hidden="true"
      >
        <div className={`${styles.ambient} ${styles.ambientOne}`} />
        <div className={`${styles.ambient} ${styles.ambientTwo}`} />

        <button
          type="button"
          className={styles.skip}
          onClick={exit}
          tabIndex={-1}
        >
          Skip
        </button>

        <div className={styles.center}>
          <div className={styles.kicker}>
            <span className={styles.statusDot} />
            {phase === "greeting" ? "Welcome" : "Fullstack Developer"}
          </div>
          <div className={styles.wordMask}>
            <span
              key={word}
              className={`${styles.word} ${phase !== "greeting" ? styles.wordName : ""}`}
              lang={word === "こんにちは" ? "ja" : undefined}
            >
              {word}
            </span>
          </div>
          <div className={styles.loadTrack}>
            <span
              className={styles.loadFill}
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.brand}>
            <Mark />
            <span>Muhamad Rusdiana.</span>
          </span>
          <span className={styles.counter}>
            {progress}
            <small>%</small>
          </span>
        </div>
      </div>
    </>
  );
}
