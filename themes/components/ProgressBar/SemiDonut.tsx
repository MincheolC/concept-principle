"use client";

import { useContext } from "react";
import { ThemeContext } from "@/stores/context";

export default function SemiDonutProgressBar({
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
  const circumference = Math.PI * radius;
  const offset = ((100 - progress) / 100) * circumference;
  const strokeWidth = 16;

  const svgStartPoint = `M10,${size / 2}`; // Move To를 의미하며 시작점을 x,y로 이동함.
  const rxry = `A${radius},${radius}`; // 중심좌표
  const xAxisRotation = 0; // 0인 경우 x축과 평행, >0 인 경우 시계방향으로 각도만큼 회전, <0 반시계방향으로 각도만큼 회전
  const largeArcFlag = 0; // 180도보다 작은 아크를 그리겠다.
  const sweepFlag = 1; // 시계 방향으로 그려라
  const svgEndPoint = `${size - 10},${size / 2}`; // 아크의 끝점

  return (
    <svg width={size} height={size / 2 + 10}>
      <path
        d={`${svgStartPoint} ${rxry} ${xAxisRotation} ${largeArcFlag},${sweepFlag} ${svgEndPoint}`}
        fill="none"
        stroke="#ddd"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d={`${svgStartPoint} ${rxry} ${xAxisRotation} ${largeArcFlag},${sweepFlag} ${svgEndPoint}`}
        fill="none"
        stroke={themeColors.primary}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text
        x={size / 2}
        y={(size / 7) * 3}
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
