import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserLoginQuery } from './UserLoginQuery';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IPasswordEncoder } from 'src/Application/IPasswordEncoder';
import { PasswordNotMatchException } from 'src/Domain/User/Exception/PasswordNotMatchException';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { UserView } from '../View/UserView';

@QueryHandler(UserLoginQuery)
export class UserLoginQueryHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordEncoder')
    private readonly passwordEncoder: IPasswordEncoder
  ) {}

  public async execute(query: UserLoginQuery): Promise<UserView> {
    const email = query.email.toLowerCase();
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (
      false ===
      (await this.passwordEncoder.compare(user.getPassword(), query.password))
    ) {
      throw new PasswordNotMatchException();
    }

    return new UserView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail(),
      user.getApiToken()
    );
  }
}
