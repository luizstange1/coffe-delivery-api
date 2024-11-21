import { Router } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

interface userProps {
  name: string;
  email: string;
  surname: string;
  password: string;
}

export function createUser() {
  const router = Router();

  router.post("/usuario/cadastro", async (req, res) => {
    const { name, surname, email, password } = req.body as userProps;
    const handleCheckUserExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    if (!handleCheckUserExists) {
      try {
        const user = await prisma.user.create({
          data: {
            name,
            surname,
            email,
            password: passwordHash,
          },
        });

        return res.status(200).json(user);
      } catch (error) {
        console.error("Erro ao encontrar usuário", error);
        res.status(404).json({ error: "Erro ao encontrar usuário" });
      }
    } else {
      res
        .status(409)
        .json({ msg: "O email informado já existe em outra conta." });
    }
  });

  return router;
}
