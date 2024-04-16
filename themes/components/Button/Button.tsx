"use client";

import { useContext } from "react";
import { ThemeContext } from "@/stores/context";
import Color from "color";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => Color(props.theme.primary).darken(0.2).hex()};
  }
`;

export default function Button({ label, ...props }: ButtonProps) {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext.colors;

  return (
    <StyledButton theme={themeColors} className="px-4 py-3 h-12 rounded-md shadow-lg" {...props}>
      {label}
    </StyledButton>
  );
}
