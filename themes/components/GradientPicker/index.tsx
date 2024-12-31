import { useState } from "react";
import ColorPicker from "./ColorPicker";
import { RgbaColor } from "react-colorful";
import rgbHex from "rgb-hex";
import ColorInput from "./ColorInput";

export default function GradientPicker() {
  const [color, setColor] = useState<RgbaColor>({
    r: 255,
    g: 123,
    b: 100,
    a: 1,
  });
  const [colors, setColors] = useState<RgbaColor[]>([color]);
  const [gradient, setGradient] = useState();

  const handleOnChange = (color: RgbaColor) => {
    setColor(color);
  };

  const handleOnAddColor = () => {
    setColors((prev) => [...prev, color]);
  };

  return (
    <div className="flex flex-col border shadow rounded-lg">
      <div className=""></div>
      <div className="flex justify-center">
        <button onClick={handleOnAddColor}>+</button>
      </div>
      <div className="flex px-4 py-6  min-w-96 gap-4">
        <ColorPicker color={color} onChange={handleOnChange} />
        <div>
          {colors.map((c, idx) => (
            <ColorInput key={idx} color={rgbHex(c.r, c.g, c.b, c.a)} stop={0} />
          ))}
        </div>
      </div>
    </div>
  );
}
