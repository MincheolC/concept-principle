"use client";

import { useContext } from "react";
import { ThemeContext } from "@/stores/context";
import _ from "lodash";

function PaletteCard({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg border-[0.5px] text-slate-400 text-sm transition-transform duration-300 ease-in-out hover:animate-shake max-h-24">
      <div className="rounded-t-lg h-12" style={{ backgroundColor: color }}></div>
      <div className="px-4 pt-3">{name}</div>
      <div className="rounded-b-lg px-4 pb-3">{color}</div>
    </div>
  );
}

export default function PaletteCardList() {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext.colors;

  return (
    <div className="grid grid-cols-6 gap-4 max-h-64">
      {_.flatMap(_.omit(themeColors, ["icon"]), (value, key) =>
        typeof value === "string"
          ? [<PaletteCard key={key} name={key} color={value} />]
          : _.map(value, (statusValue, statusKey) => (
              <PaletteCard key={`${key}-${statusKey}`} name={statusKey} color={statusValue} />
            ))
      )}
    </div>
  );
}
