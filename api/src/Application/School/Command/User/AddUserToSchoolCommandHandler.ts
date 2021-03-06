import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { SchoolNotFoundException } from 'src/Domain/School/Exception/SchoolNotFoundException';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { ISchoolUserRepository } from 'src/Domain/School/Repository/ISchoolUserRepository';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { UserAlreadyAddedToSchoolException } from 'src/Domain/User/Exception/UserAlreadyAddedToSchoolException';
import { UserNotFoundException } from 'src/Domain/User/Exception/UserNotFoundException';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IsUserAlreadyAddedToSchool } from 'src/Domain/User/Specification/IsUserAlreadyAddedToSchool';
import { AddUserToSchoolCommand } from './AddUserToSchoolCommand';

@CommandHandler(AddUserToSchoolCommand)
export class AddUserToSchoolCommandHandler {
  constructor(
    @Inject('ISchoolRepository')
    private readonly schoolRepository: ISchoolRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ISchoolUserRepository')
    private readonly schoolUserRepository: ISchoolUserRepository,
    private readonly isUserAlreadyAddedToSchool: IsUserAlreadyAddedToSchool,
  ) {}

  public async execute(command: AddUserToSchoolCommand): Promise<string> {
    const { schoolId, userId } = command;

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const school = await this.schoolRepository.findOneById(schoolId);
    if (!school) {
      throw new SchoolNotFoundException();
    }

    if (true === (await this.isUserAlreadyAddedToSchool.isSatisfiedBy(school, user))) {
      throw new UserAlreadyAddedToSchoolException();
    }

    const schoolUser = await this.schoolUserRepository.save(
      new SchoolUser(school, user)
    );

    // @todo : send email

    return schoolUser.getId();
  }
}
