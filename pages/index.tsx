// import Image from 'next/image'
// import Link from 'next/link'
import prisma from "../lib/prisma";
import { Color } from "@prisma/client";
import useSWR from "swr";

import ColorBox from "../components/colorbox";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRandomHex } from "../utils";

type Props = {
  color1: Color;
  color2: Color;
};

// export async function getServerSideProps() {
//   // fetch two color
//   const hex1 = getRandomHex();
//   const hex2 = getRandomHex();

//   const color1 = await prisma.color.upsert({
//     where: { color: hex1 },
//     update: {},
//     create: { color: hex1, winCount: 0, loseCount: 0 },
//   });

//   const color2 = await prisma.color.upsert({
//     where: { color: hex2 },
//     update: {},
//     create: { color: hex2, winCount: 0, loseCount: 0 },
//   });

//   return { props: { color1, color2 } };
// }
//@ts-ignore
const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  const { data, error, isValidating, mutate } = useSWR("/api/colors", fetcher);

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
        color1: data.data[0].color,
        color2: data.data[1].color,
        chosenColor: color,
      }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    mutate();
    setSelectedColor(null);
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
        {isValidating && "loading..."}
        {error && "error!"}
        {!isValidating && data && (
          <>
            <ColorBox
              color={data.data[0].color}
              selectedColor={selectedColor}
              onClick={handleSelect}
            />
            <ColorBox
              color={data.data[1].color}
              selectedColor={selectedColor}
              onClick={handleSelect}
            />
          </>
        )}

        <div className={styles.submitbutton} onClick={handleSubmit}>
          submit
        </div>
      </div>
    </div>
  );
}
