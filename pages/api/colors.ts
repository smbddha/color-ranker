// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { Color } from "@prisma/client";
import { getRandomHex } from "../../utils";

type Data = {
  success: boolean;
  message?: string;
  data?: [Color, Color];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res
      .status(405)
      .send({ success: false, message: "Only GET requests allowed" });
    return;
  }

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

  res.status(200).json({ success: true, data: [color1, color2] });
}
