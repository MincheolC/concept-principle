"use client";

import { useContext, useState } from "react";
import { ThemeContext } from "@/stores/context";
import styled from "styled-components";
import { Theme } from "@/types";

interface CheckboxProps {
  label: string;
}

interface CheckboxStyleProps {
  checked: boolean;
  xTheme: Theme;
}

interface CheckIconProps {
  size?: number; // 아이콘 크기를 위한 선택적 prop
  color?: string; // 아이콘 색상을 위한 선택적 prop
}

const StyledCheckBox = styled.div<CheckboxStyleProps>`
  border: 2px solid ${(props) => (props.checked ? props.xTheme.colors.primary : "#ddd")};
  background-color: ${(props) => (props.checked ? props.xTheme.colors.primary : props.xTheme.colors.white)};
`;

const CheckIcon: React.FC<CheckIconProps> = ({ size = 24, color = "#FFFFFF" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-current"
      style={{ color }}
    >
      <path d="M4,13 l4,6 L19,7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function CheckBox({ label }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const themeContext = useContext(ThemeContext);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={toggleCheckbox}>
      <StyledCheckBox
        className={`w-6 h-6 p-1 flex justify-center items-center mr-2 border-2 rounded-md`}
        checked={isChecked}
        xTheme={themeContext}
      >
        {isChecked && <CheckIcon />}
      </StyledCheckBox>
      <span className="text-slate-600">{label}</span>
    </div>
  );
}
