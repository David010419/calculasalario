"use client";

import { useEffect, useRef, useState } from "react";

interface AdSlotProps {
  variant: "top" | "middle" | "bottom" | "smartlink";
  className?: string;
}

const NATIVE_BANNER_CONTAINER_ID = "container-3af8380449cff3971d77be0ca95c8261";
const NATIVE_BANNER_SRC =
  "https://pl30939012.effectivecpmnetwork.com/3af8380449cff3971d77be0ca95c8261/invoke.js";

const STANDARD_BANNER_SRC =
  "https://www.highperformanceformat.com/8d025fddadc703bf9c2cc5b6dbbddb56/invoke.js";
const STANDARD_BANNER_OPTIONS = {
  key: "8d025fddadc703bf9c2cc5b6dbbddb56",
  format: "iframe",
  height: 60,
  width: 468,
  params: {},
};

// Adsterra doesn't fire a "no fill" event on these simple invoke.js tags, so we poll the
// DOM briefly for a real ad creative and collapse the slot if nothing ever loads — an
// empty reserved box looks broken, no box at all just looks like there was never an ad there.
const FILL_CHECK_DELAY_MS = 2500;

/** Adsterra native banner: script scans the DOM for its container id and injects the ad markup. */
function NativeBannerAd({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasFill, setHasFill] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = NATIVE_BANNER_SRC;
    containerRef.current?.appendChild(script);

    const timer = setTimeout(() => {
      const hasImage = !!containerRef.current?.querySelector("img[src]");
      const hasRealLink = Array.from(containerRef.current?.querySelectorAll("a[href]") ?? []).some((a) => {
        const href = a.getAttribute("href") ?? "";
        return href.length > 2 && href !== "//" && href !== "#";
      });
      setHasFill(hasImage || hasRealLink);
    }, FILL_CHECK_DELAY_MS);

    return () => {
      clearTimeout(timer);
      script.remove();
    };
  }, []);

  return (
    <div
      className={`ad-container-top mx-auto my-5 w-full ${hasFill ? "" : "hidden"} ${className}`}
      aria-hidden="true"
    >
      <div ref={containerRef} id={NATIVE_BANNER_CONTAINER_ID} />
    </div>
  );
}

/** Adsterra standard banner: reads window.atOptions, must be set before invoke.js loads. */
function StandardBannerAd({ className = "" }: { className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hasFill, setHasFill] = useState(true);

  useEffect(() => {
    const win = window as typeof window & { atOptions?: unknown };
    win.atOptions = STANDARD_BANNER_OPTIONS;

    const script = document.createElement("script");
    script.src = STANDARD_BANNER_SRC;
    wrapperRef.current?.appendChild(script);

    const timer = setTimeout(() => {
      const iframe = wrapperRef.current?.querySelector("iframe");
      const filled = !!iframe && !!iframe.src && !iframe.src.endsWith("about:blank");
      setHasFill(filled);
    }, FILL_CHECK_DELAY_MS);

    return () => {
      clearTimeout(timer);
      script.remove();
      delete win.atOptions;
    };
  }, []);

  return (
    <div
      className={`ad-container-bottom mx-auto my-5 flex w-full justify-center overflow-x-auto ${hasFill ? "" : "hidden"} ${className}`}
      aria-hidden="true"
    >
      <div ref={wrapperRef} />
    </div>
  );
}

function PlaceholderAd({ variant, className = "" }: { variant: "middle" | "smartlink"; className?: string }) {
  const label = variant === "smartlink" ? "Ofertas patrocinadas" : "Publicidad";
  const sizeClass = variant === "smartlink" ? "min-h-[52px] w-full" : "min-h-[90px] w-full";

  return (
    <div
      className={`ad-container-${variant} my-5 mx-auto flex items-center justify-center rounded-lg border border-dashed border-border bg-surface/60 ${sizeClass} ${className}`}
      aria-hidden="true"
      data-ad-slot={variant}
    >
      <span className="text-xs uppercase tracking-wide text-text-muted">{label}</span>
    </div>
  );
}

export default function AdSlot({ variant, className = "" }: AdSlotProps) {
  if (variant === "top") return <NativeBannerAd className={className} />;
  if (variant === "bottom") return <StandardBannerAd className={className} />;
  return <PlaceholderAd variant={variant} className={className} />;
}
