import { Router } from "express";
import { prisma } from "../lib/prisma";

export function getUsers() {
  const router = Router();

  router.get("/user", async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          name: true,
          surname: true,
          email: true,
          is_administrator: true,
        },
      });

      return res.json(users);
    } catch (error) {
      console.log(error);
    }
  });

  return router;
}
