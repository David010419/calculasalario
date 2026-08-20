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

/** Adsterra native banner: script scans the DOM for its container id and injects the ad markup. */
function NativeBannerAd({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = NATIVE_BANNER_SRC;
    script.onerror = () => setFailed(true);
    containerRef.current?.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      className={`ad-container-top mx-auto my-5 w-full ${failed ? "hidden" : ""} ${className}`}
      aria-hidden="true"
    >
      <div ref={containerRef} id={NATIVE_BANNER_CONTAINER_ID} />
    </div>
  );
}

/**
 * Adsterra standard banner: reads window.atOptions, must be set before invoke.js loads.
 * Reused for both "middle" and "bottom" slots — Adsterra scopes the injected iframe to its
 * own <script> tag (not document.write), so two independent instances on the same page are
 * safe. Note: since both instances share the same ad key, Adsterra's dashboard will report
 * impressions from both placements as one zone — request a second banner code if you need
 * separate stats per placement.
 */
function StandardBannerAd({ variant, className = "" }: { variant: "middle" | "bottom"; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const win = window as typeof window & { atOptions?: unknown };
    win.atOptions = STANDARD_BANNER_OPTIONS;

    const script = document.createElement("script");
    script.src = STANDARD_BANNER_SRC;
    script.onerror = () => setFailed(true);
    wrapperRef.current?.appendChild(script);

    return () => {
      script.remove();
      delete win.atOptions;
    };
  }, []);

  return (
    <div
      className={`ad-container-${variant} mx-auto my-5 flex w-full justify-center overflow-x-auto ${failed ? "hidden" : ""} ${className}`}
      aria-hidden="true"
    >
      <div ref={wrapperRef} />
    </div>
  );
}

function PlaceholderAd({ className = "" }: { className?: string }) {
  return (
    <div
      className={`ad-container-smartlink my-5 mx-auto flex min-h-[52px] w-full items-center justify-center rounded-lg border border-dashed border-border bg-surface/60 ${className}`}
      aria-hidden="true"
      data-ad-slot="smartlink"
    >
      <span className="text-xs uppercase tracking-wide text-text-muted">Ofertas patrocinadas</span>
    </div>
  );
}

export default function AdSlot({ variant, className = "" }: AdSlotProps) {
  if (variant === "top") return <NativeBannerAd className={className} />;
  if (variant === "middle" || variant === "bottom") return <StandardBannerAd variant={variant} className={className} />;
  return <PlaceholderAd className={className} />;
}
