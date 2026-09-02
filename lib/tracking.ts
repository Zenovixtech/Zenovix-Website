export const APPROVED_TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'platform',
  'gclid',
  'fbclid',
  'fbp',
  'fbc',
  'matchtype',
  'network',
  'device',
  'keyword',
  'placement',
  'campaignid',
  'adgroupid',
] as const;

export type TrackingKey = (typeof APPROVED_TRACKING_KEYS)[number];

export type TrackingData = Partial<Record<TrackingKey, string>>;

export const UTM_STORAGE_KEY = 'zenovix_utm_attribution';

/**
 * Safely parse query search string and filter strictly by approved tracking allowlist.
 * Values are trimmed, capped at 200 characters, and empty strings are omitted.
 */
export function extractTrackingParams(search: string): TrackingData {
  const result: TrackingData = {};
  if (!search || typeof search !== 'string') return result;

  try {
    const params = new URLSearchParams(search);
    for (const key of APPROVED_TRACKING_KEYS) {
      const val = params.get(key);
      if (val !== null) {
        const trimmed = val.trim();
        if (trimmed.length > 0) {
          result[key] = trimmed.slice(0, 200);
        }
      }
    }
  } catch {
    // URLSearchParams error fallback
  }

  return result;
}

/**
 * Safely retrieve stored attribution from sessionStorage.
 * - If the stored value is malformed JSON or non-object JSON, it is safely removed via
 *   sessionStorage.removeItem(UTM_STORAGE_KEY).
 * - Valid stored attribution is NOT removed if it contains unknown keys; only allowlisted keys are returned.
 */
export function getStoredTracking(): TrackingData {
  if (typeof window === 'undefined') return {};
  try {
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return {};

    let parsed: unknown;
    try {
      parsed = JSON.parse(stored);
    } catch {
      // Malformed JSON: safely remove corrupted entry
      try {
        window.sessionStorage.removeItem(UTM_STORAGE_KEY);
      } catch {
        // Storage removal failure safely caught
      }
      return {};
    }

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      // Non-object JSON: safely remove corrupted entry
      try {
        window.sessionStorage.removeItem(UTM_STORAGE_KEY);
      } catch {
        // Storage removal failure safely caught
      }
      return {};
    }

    const clean: TrackingData = {};
    const record = parsed as Record<string, unknown>;
    for (const key of APPROVED_TRACKING_KEYS) {
      const val = record[key];
      if (typeof val === 'string') {
        const trimmed = val.trim();
        if (trimmed.length > 0) {
          clean[key] = trimmed.slice(0, 200);
        }
      }
    }
    return clean;
  } catch {
    return {};
  }
}

/**
 * Safely save attribution to sessionStorage.
 * A clean/empty input does NOT overwrite existing stored attribution.
 */
export function saveStoredTracking(data: TrackingData): void {
  if (typeof window === 'undefined') return;
  const keys = Object.keys(data) as TrackingKey[];
  if (keys.length === 0) return; // Clean URL does not overwrite stored attribution

  try {
    const existing = getStoredTracking();
    const merged: TrackingData = { ...existing, ...data };
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Storage access disabled (e.g. private browsing quota)
  }
}

/**
 * Safely clear stored attribution after confirmed API success.
 */
export function clearStoredTracking(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(UTM_STORAGE_KEY);
  } catch {
    // Storage access disabled
  }
}

/**
 * Read effective tracking values with priority:
 * 1. Live URL query parameters
 * 2. Stored sessionStorage attribution
 */
export function getEffectiveTracking(): TrackingData {
  if (typeof window === 'undefined') return {};

  const liveParams = extractTrackingParams(window.location.search);
  if (Object.keys(liveParams).length > 0) {
    saveStoredTracking(liveParams);
  }
  const storedParams = getStoredTracking();

  // Live URL values take priority over stored values
  const effective: TrackingData = { ...storedParams, ...liveParams };

  // Remove any empty string values
  const clean: TrackingData = {};
  for (const key of APPROVED_TRACKING_KEYS) {
    const val = effective[key];
    if (val && typeof val === 'string' && val.trim().length > 0) {
      clean[key] = val.trim().slice(0, 200);
    }
  }

  return clean;
}
