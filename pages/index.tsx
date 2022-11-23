// import Image from 'next/image'
// import Link from 'next/link'
import prisma from "../lib/prisma";
import { Color} from "@prisma/client";
import ColorBox from "../components/colorbox";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  color1: Color;
  color2: Color;
};

const HEX_MAX = 256 ** 3;
function getRandomHex() {
  return Math.floor(Math.random() * HEX_MAX);
}

export async function getServerSideProps() {
  // fetch two color
  const hex1 = getRandomHex();
  const hex2 = getRandomHex();

  const color1 = await prisma.color.upsert({
    where: { color: hex1 },
    update: {},
    create: { color: hex1, winCount: 0, loseCount: 0 },
  });

  const color2 = await prisma.color.upsert({
    where: { color: hex2 },
    update: {},
    create: { color: hex2, winCount: 0, loseCount: 0 },
  });

  return { props: { color1, color2 } };
}

export default function Home(props: Props) {
  let { color1, color2 } = props;

  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  const handleSelect = (color: number) => {
    setSelectedColor(color);
  };

  const submitVote = async (color: number) => {
    const res = await fetch(`/api/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        color1: color1.color,
        color2: color2.color,
        chosenColor: color,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    router.reload();
  };

  const handleSubmit = () => {
    if (!selectedColor) return;
    submitVote(selectedColor);
  };

  return (
    <div className={styles.main}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "3rem",
          border: "3px solid black",
          height: "24rem",
          width: "42rem",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <label className={styles.label}> which color do you prefer? </label>
        <ColorBox
          color={color1.color}
          selectedColor={selectedColor}
          onClick={handleSelect}
        />
        <ColorBox
          color={color2.color}
          selectedColor={selectedColor}
          onClick={handleSelect}
        />

        <div className={styles.submitbutton} onClick={handleSubmit}>
          submit
        </div>
      </div>
    </div>
  );
}
