import { z } from "zod";
import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  message?: string;
};

const VoteValidation = z.object({
  color1: z.number(),
  color2: z.number(),
  chosenColor: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res
      .status(405)
      .send({ success: false, message: "Only POST requests allowed" });
    return;
  }

  const data = req.body;

  if (!VoteValidation.safeParse(req.body).success) {
    res.status(405).send({ success: false, message: "invalid vote" });
    return;
  }

  const vote = await prisma.vote.create({
    data: {
      color1Id: data.color1,
      color2Id: data.color2,
      chosenColorId: data.chosenColor,
    },
  });

  if (vote.chosenColorId === vote.color1Id) {
    await prisma.color.update({
      where: { color: vote.color1Id },
      data: {
        winCount: {
          increment: 1,
        },
      },
    });
    await prisma.color.update({
      where: { color: vote.color2Id },
      data: {
        loseCount: {
          increment: 1,
        },
      },
    });
  } else {
    await prisma.color.update({
      where: { color: vote.color2Id },
      data: {
        winCount: {
          increment: 1,
        },
      },
    });
    await prisma.color.update({
      where: { color: vote.color1Id },
      data: {
        loseCount: {
          increment: 1,
        },
      },
    });
  }

  res.status(201).send({ success: true });
}
