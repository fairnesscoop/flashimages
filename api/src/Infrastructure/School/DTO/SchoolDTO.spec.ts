import { SchoolDTO } from './SchoolDTO';
import { validate } from 'class-validator';

describe('SchoolDTO', () => {
  it('testValidDTO', async () => {
    const dto = new SchoolDTO();
    dto.reference = 'xLKJs';
    dto.address = '127 rue Bélliard';
    dto.city = 'Paris';
    dto.zipCode = '75018';
    dto.name = 'Ecole élémentaire';

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new SchoolDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(5);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: "reference should not be empty"
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: "name should not be empty"
    });
    expect(validation[2].constraints).toMatchObject({
      isNotEmpty: "address should not be empty"
    });
    expect(validation[3].constraints).toMatchObject({
      isNotEmpty: "city should not be empty"
    });
    expect(validation[4].constraints).toMatchObject({
      isNotEmpty: "zipCode should not be empty",
      maxLength: "zipCode must be shorter than or equal to 6 characters"
    });
  });
});