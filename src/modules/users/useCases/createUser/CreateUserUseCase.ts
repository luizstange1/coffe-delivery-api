import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcrypt';
import {
  ICreateUserDTO,
  IUsersRepository,
} from '../../repositories/IUsersRepository';

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, surname, password, email }: ICreateUserDTO) {
    const handleCheckUserExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    if (!handleCheckUserExists) {
      try {
        const user = this.usersRepository.create({
          name,
          surname,
          email,
          password: passwordHash,
        });

        return user;
      } catch (error) {
        console.error('Erro ao encontrar usuário', error);
        throw new Error('Erro ao encontrar usuário');
      }
    } else {
      throw new Error('O email informado já existe em outra conta.');
    }
  }
}
