"use client";

import Link, { LinkProps } from "next/link";
import React, { useEffect, useState } from "react";

interface TrackingLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  role?: string;
  tabIndex?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | "true" | "false" | boolean;
  "aria-expanded"?: boolean | "true" | "false";
  "aria-haspopup"?: boolean | "true" | "false" | "menu" | "listbox" | "tree" | "grid" | "dialog";
  style?: React.CSSProperties;
}

/**
 * TrackingLink preserves active UTM / click-ID attribution query parameters
 * when navigating internally across Zenovix routes.
 */
export default function TrackingLink({
  href,
  children,
  ...props
}: TrackingLinkProps) {
  const [targetHref, setTargetHref] = useState<string>(
    typeof href === "string" ? href : href.toString()
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const currentSearch = window.location.search;
    if (!currentSearch) return;

    if (typeof href === "string") {
      // Only append search params to internal absolute/relative paths
      if (href.startsWith("/") && !href.includes("?")) {
        setTargetHref(`${href}${currentSearch}`);
      } else if (href.startsWith("/") && href.includes("?")) {
        // Merge params
        const [basePath, existingQuery] = href.split("?");
        const merged = new URLSearchParams(currentSearch);
        const existing = new URLSearchParams(existingQuery);
        existing.forEach((val, key) => merged.set(key, val));
        setTargetHref(`${basePath}?${merged.toString()}`);
      }
    }
  }, [href]);

  return (
    <Link href={targetHref} {...props}>
      {children}
    </Link>
  );
}
