import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateEventCommand } from './CreateEventCommand';
import { IEventRepository } from 'src/Domain/Calendar/Repository/IEventRepository';
import { ISchoolRepository } from 'src/Domain/School/Repository/ISchoolRepository';
import { Event } from 'src/Domain/Calendar/Event.entity';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { AbstractEventCommandHandler } from './AbstractEventCommandHandler';

@CommandHandler(CreateEventCommand)
export class CreateEventCommandHandler extends AbstractEventCommandHandler {
  constructor(
    @Inject('ISchoolRepository') schoolRepository: ISchoolRepository,
    @Inject('IUserRepository') userRepository: IUserRepository,
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {
    super(schoolRepository, userRepository);
  }

  public async execute(command: CreateEventCommand): Promise<string> {
    const { date, summary, userId, schoolId } = command;

    const [ user, school ] = await Promise.all([
      this.getUser(userId),
      this.getSchool(schoolId)
    ]);

    const event = await this.eventRepository.save(
      new Event(
        date,
        user,
        school,
        summary
      )
    );

    return event.getId();
  }
}
