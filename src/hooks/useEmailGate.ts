"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ct_email";
const EXPIRY_DAYS = 30;

interface EmailGateState {
  email: string | null;
  showGate: boolean;
  dismissGate: () => void;
}

export function useEmailGate(): EmailGateState {
  const [email, setEmail] = useState<string | null>(null);
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const now = Date.now();
        const elapsed = now - parsed.timestamp;
        const maxAge = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

        if (elapsed < maxAge) {
          setEmail(parsed.email);
          setShowGate(false);
          return;
        }
      }
    } catch {
      // ignore parse errors
    }

    setEmail(null);
    setShowGate(true);
  }, []);

  const dismissGate = useCallback(() => {
    setShowGate(false);
  }, []);

  return { email, showGate, dismissGate };
}

export function saveEmailToStorage(emailValue: string): void {
  try {
    const payload = {
      email: emailValue,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // storage might be full or unavailable
  }
}
