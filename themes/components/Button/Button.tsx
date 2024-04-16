"use client";

import { useContext, ComponentType } from "react";
import { ThemeContext } from "@/stores/context";
import Color from "color";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  HeroIcon?: ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
}

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => Color(props.theme.primary).darken(0.2).hex()};
    transform: scale(1.1);
  }
`;

export default function Button({ label, HeroIcon, iconPosition = "left", ...props }: ButtonProps) {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext.colors;

  return (
    <StyledButton theme={themeColors} className="flex items-center px-4 py-3 h-12 rounded-md shadow-lg" {...props}>
      {iconPosition === "left" && HeroIcon && <HeroIcon className="mr-2 h-5 w-5" />}
      {label}
      {iconPosition === "right" && HeroIcon && <HeroIcon className="ml-2 h-5 w-5" />}
    </StyledButton>
  );
}
