import { mock, instance, when, verify } from 'ts-mockito';
import { SchoolUser } from 'src/Domain/School/SchoolUser.entity';
import { User } from 'src/Domain/User/User.entity';
import { GetSchoolUsersQuery } from './GetSchoolUsersQuery';
import { GetSchoolUsersQueryHandler } from './GetSchoolUsersQueryHandler';
import { SchoolUserRepository } from 'src/Infrastructure/School/Repository/SchoolUserRepository';
import { SchoolUserView } from '../../View/SchoolUserView';

describe('GetSchoolUsersQueryHandler', () => {
  it('testGetSchoolUsers', async () => {
    const schoolUserRepository = mock(SchoolUserRepository);

    const user1 = mock(User);
    when(user1.getEmail()).thenReturn('mathieu@fairness.coop');

    const schoolUser1 = mock(SchoolUser);
    when(schoolUser1.getId()).thenReturn('4de2ffc4-e835-44c8-95b7-17c171c09873');
    when(schoolUser1.getUser()).thenReturn(instance(user1));

    when(
      schoolUserRepository.findUsersBySchool(
        '5eb3173b-97ab-4bbc-b31c-878d4bfafbc1'
      )
    ).thenResolve([instance(schoolUser1)]);

    const queryHandler = new GetSchoolUsersQueryHandler(
      instance(schoolUserRepository)
    );

    const expectedResult = [
      new SchoolUserView(
        '4de2ffc4-e835-44c8-95b7-17c171c09873',
        'mathieu@fairness.coop',
        'schoolUser'
      )
    ];

    expect(
      await queryHandler.execute(
        new GetSchoolUsersQuery('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
      )
    ).toMatchObject(expectedResult);
    verify(
      schoolUserRepository.findUsersBySchool('5eb3173b-97ab-4bbc-b31c-878d4bfafbc1')
    ).once();
  });
});
