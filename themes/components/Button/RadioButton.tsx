import { useContext, useState } from "react";
import { ThemeContext } from "@/stores/context";
import styled from "styled-components";
import { Theme } from "@/types";

interface CheckboxStyleProps {
  checked: boolean;
  xTheme: Theme;
}

const StyledRadio = styled.div<CheckboxStyleProps>`
  border-color: ${(props) => (props.checked ? props.xTheme.colors.primary : "#ddd")};
  transition: background-color 0.2s;
  &:hover {
    border-color: ${(props) => props.xTheme.colors.primary};
  }
`;

export default function RadioButtons({ options }: { options: string[] }) {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const themeContext = useContext(ThemeContext);

  const handleChange = (value: string) => {
    console.log(value);
    setSelectedOption(value);
  };

  return (
    <div className="flex flex-col justify-center items-start space-y-2">
      {options.map((option, index) => (
        <label key={index} className="flex items-center space-x-2 cursor-pointer">
          <StyledRadio
            className="w-5 h-5 rounded-full border-[6px]"
            xTheme={themeContext}
            checked={selectedOption === option}
            onClick={() => handleChange(option)}
            role="radio"
            aria-checked={selectedOption === option}
          />
          <span className="text-slate-600">{option}</span>
        </label>
      ))}
    </div>
  );
}
