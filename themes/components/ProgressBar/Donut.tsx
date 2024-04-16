"use client";

import { useContext } from "react";
import { ThemeContext } from "@/stores/context";

export default function DonutProgressBar({
  progress,
  size = 100,
  fontSize = 20,
}: {
  progress: number;
  size?: number;
  fontSize?: number;
}) {
  const themeContext = useContext(ThemeContext);
  const themeColors = themeContext.colors;

  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - progress) / 100) * circumference;
  const strokeWidth = 16;

  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#ddd" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={themeColors.primary}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round" // 끝을 둥글게 처리
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 - 13}
        fill={themeColors.black} // 텍스트 색상 설정
        fontSize={12} // 폰트 크기 설정
        textAnchor="middle" // 텍스트를 가운데 정렬하기 위함
        alignmentBaseline="central" // 세로 방향에서 가운데 정렬하기 위함
      >
        Active users
      </text>
      <text
        x={size / 2}
        y={size / 2 + 10}
        fill={themeColors.black} // 텍스트 색상 설정
        fontSize={fontSize} // 폰트 크기 설정
        textAnchor="middle" // 텍스트를 가운데 정렬하기 위함
        alignmentBaseline="central" // 세로 방향에서 가운데 정렬하기 위함
      >
        {`${progress}%`}
      </text>
    </svg>
  );
}
