"use client";

import { useContext } from "react";
import { ThemeContext } from "@/stores/context";

export default function LinearProgressBar({ progress }: { progress: number }) {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext.colors;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-48 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-4 rounded-full" style={{ backgroundColor: themeColors.primary, width: `${progress}%` }} />
      </div>
      <div className="mt-2">
        <span className="text-sm mr-2 text-slate-500">Active Users</span>
        {`${progress}%`}
      </div>
    </div>
  );
}
