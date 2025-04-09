import { User } from '.prisma/client';

export interface ICreateUserDTO {
  name: string;
  email: string;
  surname: string;
  password: string;
}

interface IGetUserDataDTO {
  name: string;
  surname: string;
  is_administrator: boolean;
}

export interface IUsersRepository {
  create({ name, email, surname, password }: ICreateUserDTO): void;
  getUserData(id: string): Promise<IGetUserDataDTO | null>;
}
