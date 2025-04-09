export interface ICreateUserDTO {
  name: string;
  email: string;
  surname: string;
  password: string;
}

export interface IUsersRepository {
  create({ name, email, surname, password }: ICreateUserDTO): void;
}
