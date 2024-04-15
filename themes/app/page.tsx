"use client";

import { useContext } from "react";
import { ThemeProvider, ThemeContext } from "@/stores/context";
import { defaultTheme } from "@/styles/themes";
import Button from "@/components/Button";
import PaletteCardList from "@/components/PaletteCardList";
import { LinearProgressBar, DonutProgressBar, SemiDonutProgressBar } from "@/components/ProgressBar";

export default function Home() {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext.colors;

  return (
    <ThemeProvider value={defaultTheme}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="text-2xl">
          Welcome to
          <span style={{ color: themeColors.primary }} className="font-bold">
            {" "}
            Brand Color Mood Board{" "}
          </span>
          👋
        </div>
        <section className="flex h-1/2">
          <PaletteCardList />
          <div className="mx-20"></div>
          <div className="flex flex-col justify-center items-center gap-8">
            <LinearProgressBar progress={80} />
            <DonutProgressBar progress={65} size={150} fontSize={24} />
            <SemiDonutProgressBar progress={30} size={150} fontSize={24} />
          </div>
        </section>
        <section>
          <Button label="Button CTA" />
        </section>
      </main>
    </ThemeProvider>
  );
}
