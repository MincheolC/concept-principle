"use client";

import { useContext, useEffect } from "react";
import { ThemeProvider, ThemeContext } from "@/stores/context";
import { defaultTheme } from "@/styles/themes";
import { Button, RadioButton } from "@/components/Button";
import { CheckBox } from "@/components/Input";
import PaletteCardList from "@/components/PaletteCardList";
import { LinearProgressBar, DonutProgressBar, SemiDonutProgressBar } from "@/components/ProgressBar";
// import GradientPicker from "@/components/GradientPicker";
import GradientPicker from "@/components/GradientPicker";
import { RocketLaunchIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext.colors;

  useEffect(() => {
    async function fn() {
      const response = await fetch("https://jdbdoteg08.execute-api.ap-northeast-2.amazonaws.com/api/writings", {
        method: "POST",
        body: JSON.stringify({
          roughMemo: "hello world",
        }),
      });
      console.log(response);
    }

    fn();
  }, []);

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
        <section className="flex">
          <div className="flex flex-col gap-16">
            <PaletteCardList />
            <div className="flex items-center gap-10">
              <div className="flex flex-col space-y-4">
                <CheckBox label="Remember Me" />
                <CheckBox label="I Agree" />
              </div>
              <RadioButton options={["Option 1", "Option 2", "Option 3"]} />
              <Button label="Button CTA" />
              <Button label="Button CTA" HeroIcon={RocketLaunchIcon} />
              <Button label="Button CTA" HeroIcon={PaperAirplaneIcon} iconPosition="right" />
            </div>
          </div>
          <div className="mx-20"></div>
          <div className="flex flex-col justify-center items-center gap-8">
            <LinearProgressBar initialProgress={80} />
            <DonutProgressBar progress={65} size={150} fontSize={24} />
            <SemiDonutProgressBar progress={30} size={150} fontSize={24} />
          </div>
        </section>
        <section>
          {/* <GradientPicker
            initialGradient={[
              { color: "#4f46e5", position: "0%" },
              { color: "#FFFFFF", position: "100%" },
            ]}
            initialTilt={50}
          /> */}
          <GradientPicker />
        </section>
      </main>
    </ThemeProvider>
  );
}
