import { mock, instance } from 'ts-mockito';
import { User } from '../User/User.entity';
import { Status, Type } from './AbstractSchool';
import { School } from './School.entity';

describe('School', () => {
  const director = mock(User);

  it('testGetters', () => {
    const school = new School(
      'LM120I',
      'Belliard',
      '127 Rue Belliard',
      '75018',
      'Paris',
      Status.PUBLIC,
      Type.ELEMENTARY,
      '010101010101',
      200,
      10,
      'Observation',
      '10/10/2020',
    );
    expect(school.getId()).toBeUndefined();
    expect(school.getName()).toBe('Belliard');
    expect(school.getReference()).toBe('LM120I');
    expect(school.getCity()).toBe('Paris');
    expect(school.getZipCode()).toBe('75018');
    expect(school.getAddress()).toBe('127 Rue Belliard');
    expect(school.getPhoneNumber()).toBe('010101010101');
    expect(school.getObservation()).toBe('Observation');
    expect(school.getPdv()).toBe('10/10/2020');
    expect(school.getStatus()).toBe(Status.PUBLIC);
    expect(school.getType()).toBe(Type.ELEMENTARY);
    expect(school.getNumberOfClasses()).toBe(10);
    expect(school.getNumberOfStudents()).toBe(200);
    expect(school.getDirector()).toBeUndefined();
    expect(school.getCreatedAt()).toBeUndefined();
  });

  it('testUpdate', () => {
    const school = new School(
      'LM120I',
      'Belliard',
      '127 Rue Belliard',
      '75018',
      'Paris',
      Status.PUBLIC,
      Type.ELEMENTARY,
      '010101010101',
      200,
      10,
      'Observation',
      '10/10/2020'
    );
    school.update(
      'ref',
      'name',
      'address',
      'zipCode',
      'city',
      Status.PRIVATE,
      Type.MIDDLE_SCHOOL,
      'phone',
      1,
      1,
      'obs',
      '11/10/2020'
    );

    school.updateDirector(instance(director));

    expect(school.getName()).toBe('name');
    expect(school.getReference()).toBe('ref');
    expect(school.getCity()).toBe('city');
    expect(school.getZipCode()).toBe('zipCode');
    expect(school.getAddress()).toBe('address');
    expect(school.getPhoneNumber()).toBe('phone');
    expect(school.getObservation()).toBe('obs');
    expect(school.getPdv()).toBe('11/10/2020');
    expect(school.getNumberOfClasses()).toBe(1);
    expect(school.getNumberOfStudents()).toBe(1);
    expect(school.getDirector()).toBe(instance(director));
    expect(school.getStatus()).toBe(Status.PRIVATE);
    expect(school.getType()).toBe(Type.MIDDLE_SCHOOL);
  });
});
