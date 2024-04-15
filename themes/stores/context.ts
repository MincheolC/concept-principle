"use client";

import React from "react";
import { Theme } from "@/types";
import { defaultTheme } from "@/styles/themes";

export const ThemeContext = React.createContext<Theme>(defaultTheme);
export const ThemeProvider = ThemeContext.Provider;
