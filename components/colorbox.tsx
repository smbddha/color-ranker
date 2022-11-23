import Link from "next/link";
import { useMemo, useRef } from "react";
import styles from "../styles/Home.module.css";
import { luminance, numberToRGB } from "../utils";

type Props = {
  color: number;
  selectedColor: number | null;
  onClick: (a: number) => void;
};

export default function ColorBox(props: Props) {
  const { color, selectedColor, onClick } = props;
  const ref = useRef(null);

  const lum = useMemo(() => luminance(numberToRGB(color)), []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (selectedColor === color) return;

    if (ref.current) {
      ref.current.style.transform = `scale(1.1)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (selectedColor === color) return;
    if (ref.current) {
      ref.current.style.transform = `scale(1.0)`;
    }
  };

  const handleClick = () => {
    onClick(color);
    if (ref.current) {
      ref.current.style.transform = `scale(1.1)`;
    }
  };

  return (
    <div onClick={handleClick}>
      <div
        ref={ref}
        className={styles.colorbox}
        style={{
          background: `#${color.toString(16)}`,
          transform: `scale(${color === selectedColor ? 1.1 : 1.0})`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span style={{ color: `${lum > 100 ? "black" : "white"}` }}>
          {selectedColor && `#${color.toString(16)}`}
        </span>
      </div>
    </div>
  );
}
