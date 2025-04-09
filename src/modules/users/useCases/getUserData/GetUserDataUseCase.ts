import { IUsersRepository } from '../../repositories/IUsersRepository';

export class GetUserDataUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.getUserData(id);

    return {
      name: user?.name,
      surname: user?.surname,
      is_administrator: user?.is_administrator,
    };
  }
}
