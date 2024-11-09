import { Router } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authenticateToken";

interface loginUserProps {
  email: string;
  password: string;
}

export function loginUser() {
  const router = Router();

  router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body as loginUserProps;
    const getUser = await prisma.user.findFirst({ where: { email: email } });

    if (getUser) {
      const checkPassword = await bcrypt.compare(password, getUser?.password);

      if (checkPassword) {
        try {
          const secret = process.env.SECRET!;
          const token = jwt.sign({ id: getUser.id }, secret);

          res.status(200).json({
            msg: "Usuário autenticado com sucesso",
            id: getUser.id,
            token,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        res.status(401).json({ msg: "A senha está incorreta" });
      }
    } else {
      res.status(404).json({ msg: "Usuário não encontrado." });
    }
  });

  router.get("/admin/:id", authenticateToken, async (req, res) => {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        is_administrator: true,
      },
    });

    res.json({
      id: user?.id,
      fullName: `${user?.name} ${user?.surname}`,
      email: user?.email,
      isAdministrator: user?.is_administrator,
    });
  });

  return router;
}
