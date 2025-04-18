import { prisma } from '../../../../lib/prisma';
import { ICreateUserDTO, IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private static INSTANCE: UsersRepository;

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  async create(data: ICreateUserDTO) {
    return await prisma.user.create({ data });
  }

  async getUserData(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        name: true,
        surname: true,
        is_administrator: true,
      },
    });

    return user;
  }
}
