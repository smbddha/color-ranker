// import Image from 'next/image'
// import Link from 'next/link'
import prisma from "../lib/prisma";
import { Color } from "@prisma/client";
import styles from "../styles/Home.module.css";
import { useState, useRef } from "react";
import { luminance, numberToRGB } from "../utils";

type Props = {
  topColors: Color[];
  bottomColors: Color[];
};

export async function getServerSideProps() {
  const topColors = await prisma.color.findMany({
    orderBy: [{ winCount: "desc" }],
    take: 6,
  });
  const bottomColors = await prisma.color.findMany({
    orderBy: [{ loseCount: "desc" }],
    take: 6,
  });

  return { props: { topColors, bottomColors } };
}

type ColorRowProps = {
  color: Color;
};
function ColorRow(props: ColorRowProps) {
  const { color } = props;
  const ref = useRef(null);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHover(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setIsHover(false);
  };

  const handleClick = () => {};

  return (
    <div
      ref={ref}
      className={styles.rankingrow}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        background: `#${color.color.toString(16)}`,
        textAlign: "center",
        color: isHover
          ? luminance(numberToRGB(color.color)) > 100
            ? "black"
            : "white"
          : `#${color.color.toString(16)}`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >{`#${color.color.toString(16)}`}</div>
  );
}

export default function Home(props: Props) {
  const { topColors, bottomColors } = props;

  const renderRow = (color: Color, idx: number) => {
    return (
      <div
        key={idx}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        {idx + 1}. <ColorRow color={color} />
      </div>
    );
  };

  const board = (colors: Color[], title: string) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "3rem",
          border: "3px solid black",
          // height: "24rem",
          minWidth: "22rem",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: "1.2rem",
        }}
      >
        <label className={styles.label}>{title}</label>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {colors.map((color, i) => renderRow(color, i))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.main} style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.4rem",
          height: "100%",
        }}
      >
        {board(topColors, "top colors")}
        {board(bottomColors, "bottom colors")}
      </div>
    </div>
  );
}
