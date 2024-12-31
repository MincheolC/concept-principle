import { InputHTMLAttributes, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ColorInput(props: {
  color: string;
  stop: number;
  onChange?: (color: string, stop: number) => void;
  onDelete?: () => void;
}) {
  const [color, setColor] = useState(props.color);
  const [stop, setStop] = useState(props.stop);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  const handleHexBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setColor(e.target.value);
  };
  const handleStopBlur = () => {};
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded" style={{ backgroundColor: color }} />
      <input
        className="border border-slate-300 text-sm text-center font-semibold rounded-md p-2 w-24"
        name="hex"
        type="text"
        value={`#${color}`}
        onChange={handleHexChange}
        onBlur={handleHexBlur}
      />
      <input name="stop" type="text" value={stop.toString()} onBlur={handleStopBlur} />
      <XMarkIcon className="w-6" />
    </div>
  );
}
