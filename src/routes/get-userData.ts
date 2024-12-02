import { Router } from "express";
import { prisma } from "../lib/prisma";

export function getUserData() {
  const router = Router();

  router.get("/user/:id", async (req, res) => {
    const id = req.params.id;

    const userData = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        surname: true,
        is_administrator: true,
      },
    });

    res.status(200).json({
      name: userData?.name,
      surname: userData?.surname,
      is_administrator: userData?.is_administrator,
    });
  });

  return router;
}
