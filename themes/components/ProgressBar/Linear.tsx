"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "@/stores/context";

interface LinearProgressBarProps {
  initialProgress: number;
}

export default function LinearProgressBar({ initialProgress }: LinearProgressBarProps) {
  const [progress, setProgress] = useState(initialProgress);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext.colors;

  useEffect(() => {
    const handle = handleRef.current;
    const progressBar = progressBarRef.current;
    if (!handle || !progressBar) return;

    const handleWidth = handle.offsetWidth;
    const progressBarWidth = progressBar.clientWidth;
    const maxOffset = progressBarWidth - handleWidth;

    const updateProgress = (clientX: number) => {
      const { left } = progressBar.getBoundingClientRect();
      const offset = Math.max(0, Math.min(clientX - left - handleWidth / 2, maxOffset));
      const newProgress = (offset / maxOffset) * 100;
      setProgress(Math.round(newProgress));
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateProgress(event.clientX);
    };

    const handleMouseDown = () => {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMouseMove);
        },
        { once: true }
      );
    };

    handle.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      handle.removeEventListener("mousedown", handleMouseDown);
    };
  }, [initialProgress]);

  const leftStyle =
    progressBarRef.current && handleRef.current
      ? `${(progress / 100) * (progressBarRef.current.clientWidth - handleRef.current.offsetWidth)}px`
      : `calc(${progress}% - 0.5rem)`;

  return (
    <div className="flex flex-col justify-center items-center">
      <div ref={progressBarRef} className="w-48 bg-gray-200 rounded-full overflow-hidden relative cursor-pointer">
        <div className="h-4 rounded-full" style={{ backgroundColor: themeColors.primary, width: `${progress}%` }}>
          <div
            ref={handleRef}
            className="w-4 h-4 border bg-white rounded-full absolute"
            style={{
              left: leftStyle,
              top: "50%",
              transform: "translateY(-50%)",
              borderColor: themeColors.primary,
            }}
          />
        </div>
      </div>
      <div className="mt-2">
        <span className="text-sm mr-2 text-slate-500">Progress Rate</span>
        {`${progress}%`}
      </div>
    </div>
  );
}
