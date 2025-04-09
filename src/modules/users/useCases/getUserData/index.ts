import { UsersRepository } from '../../repositories/Implementations/UsersRepository';
import { GetUserDataController } from './GetUserDataController';
import { GetUserDataUseCase } from './GetUserDataUseCase';

const usersRepository = UsersRepository.getInstance();
const getUserDataUseCase = new GetUserDataUseCase(usersRepository);
const getUserDataController = new GetUserDataController(getUserDataUseCase);

export { getUserDataController };
