"use client";

import { useEffect } from "react";
import { extractTrackingParams, saveStoredTracking } from "@/lib/tracking";

export default function UtmTracker() {
  useEffect(() => {
    try {
      const liveTracking = extractTrackingParams(window.location.search);
      if (Object.keys(liveTracking).length > 0) {
        saveStoredTracking(liveTracking);
      }
    } catch {
      // Safe fallback if window access fails
    }
  }, []);

  return null;
}
