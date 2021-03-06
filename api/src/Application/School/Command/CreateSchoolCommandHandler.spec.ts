import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { SchoolRepository } from 'src/Infrastructure/School/Repository/SchoolRepository';
import { IsSchoolAlreadyExist } from 'src/Domain/School/Specification/IsSchoolAlreadyExist';
import { School } from 'src/Domain/School/School.entity';
import { CreateSchoolCommandHandler } from 'src/Application/School/Command/CreateSchoolCommandHandler';
import { CreateSchoolCommand } from 'src/Application/School/Command/CreateSchoolCommand';
import { SchoolAlreadyExistException } from 'src/Domain/School/Exception/SchoolAlreadyExistException';
import { Status, Type } from 'src/Domain/School/AbstractSchool';
import { EventBusAdapter } from 'src/Infrastructure/Adapter/EventBusAdapter';
import { SchoolCreatedEvent } from '../Event/SchoolCreatedEvent';

describe('CreateSchoolCommandHandler', () => {
  let schoolRepository: SchoolRepository;
  let eventBusAdapter: EventBusAdapter;
  let isSchoolAlreadyExist: IsSchoolAlreadyExist;
  let createdSchool: School;
  let handler: CreateSchoolCommandHandler;

  const command = new CreateSchoolCommand(
    'LM120I',
    'Belliard',
    '127 Rue Belliard',
    '75018',
    'Paris',
    Status.PRIVATE,
    Type.ELEMENTARY,
    'mathieu@fairness.coop',
    '010101010101',
    200,
    10,
    'Observation'
  );

  beforeEach(() => {
    schoolRepository = mock(SchoolRepository);
    isSchoolAlreadyExist = mock(IsSchoolAlreadyExist);
    eventBusAdapter = mock(EventBusAdapter);
    createdSchool = mock(School);

    handler = new CreateSchoolCommandHandler(
      instance(schoolRepository),
      instance(eventBusAdapter),
      instance(isSchoolAlreadyExist)
    );
  });

  it('testSchoolCreatedSuccessfully', async () => {
    when(isSchoolAlreadyExist.isSatisfiedBy('LM120I')).thenResolve(false);
    when(createdSchool.getId()).thenReturn(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );
    when(
      schoolRepository.save(
        deepEqual(
          new School(
            'LM120I',
            'Belliard',
            '127 Rue Belliard',
            '75018',
            'Paris',
            Status.PRIVATE,
            Type.ELEMENTARY,
            'mathieu@fairness.coop',
            '010101010101',
            200,
            10,
            'Observation'
          )
        )
      )
    ).thenResolve(instance(createdSchool));

    expect(await handler.execute(command)).toBe(
      '2d5fb4da-12c2-11ea-8d71-362b9e155667'
    );

    verify(isSchoolAlreadyExist.isSatisfiedBy('LM120I')).once();
    verify(eventBusAdapter.publish(
      deepEqual(new SchoolCreatedEvent('2d5fb4da-12c2-11ea-8d71-362b9e155667'))
    )).once();
    verify(
      schoolRepository.save(
        deepEqual(
          new School(
            'LM120I',
            'Belliard',
            '127 Rue Belliard',
            '75018',
            'Paris',
            Status.PRIVATE,
            Type.ELEMENTARY,
            'mathieu@fairness.coop',
            '010101010101',
            200,
            10,
            'Observation'
          )
        )
      )
    ).once();
    verify(createdSchool.getId()).twice();
  });

  it('testSchoolAlreadyExist', async () => {
    when(isSchoolAlreadyExist.isSatisfiedBy('LM120I')).thenResolve(true);

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(SchoolAlreadyExistException);
      expect(e.message).toBe('schools.errors.already_exist');
      verify(eventBusAdapter.publish(anything())).never();
      verify(isSchoolAlreadyExist.isSatisfiedBy('LM120I')).once();
      verify(schoolRepository.save(anything())).never();
      verify(createdSchool.getId()).never();
    }
  });
});
