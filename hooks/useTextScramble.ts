"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useTextScramble(finalText: string, options?: {
  speed?: number;
  delay?: number;
  trigger?: boolean;
}) {
  const { speed = 30, delay = 0, trigger = true } = options || {};
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number | null>(null);
  const hasRunRef = useRef(false);

  const scramble = useCallback(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    let iteration = 0;
    const length = finalText.length;

    const animate = () => {
      const progress = iteration / length;
      let result = "";

      for (let i = 0; i < length; i++) {
        if (finalText[i] === " ") {
          result += " ";
        } else if (i < iteration) {
          result += finalText[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);

      if (iteration < length) {
        iteration++;
        frameRef.current = window.setTimeout(animate, speed);
      } else {
        setDisplayText(finalText);
        setIsComplete(true);
      }
    };

    frameRef.current = window.setTimeout(animate, delay);
  }, [finalText, speed, delay]);

  useEffect(() => {
    if (trigger) {
      scramble();
    }

    return () => {
      if (frameRef.current) {
        clearTimeout(frameRef.current);
      }
    };
  }, [trigger, scramble]);

  const reset = useCallback(() => {
    hasRunRef.current = false;
    setIsComplete(false);
    setDisplayText("");
  }, []);

  return { displayText, isComplete, reset };
}
