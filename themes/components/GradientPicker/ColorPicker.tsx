import { RgbaColorPicker, RgbaColor } from "react-colorful";
import "./style.css";

function ColorPicker({ color, onChange }: { color: RgbaColor; onChange: (color: RgbaColor) => void }) {
  return (
    <div className="custom-layout w-56">
      <RgbaColorPicker color={color} onChange={onChange} />
    </div>
  );
}

export default ColorPicker;
