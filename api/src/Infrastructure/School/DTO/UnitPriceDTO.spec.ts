import { UnitPriceDTO } from './UnitPriceDTO';
import { validate } from 'class-validator';

describe('UnitPriceDTO', () => {
  it('testValidDTO', async () => {
    const dto = new UnitPriceDTO();
    dto.parentUnitPrice = 333;
    dto.photographerUnitPrice = 999;

    const validation = await validate(dto);
    expect(validation).toHaveLength(0);
  });

  it('testInvalidDTO', async () => {
    const dto = new UnitPriceDTO();

    const validation = await validate(dto);
    expect(validation).toHaveLength(2);
    expect(validation[0].constraints).toMatchObject({
      isNotEmpty: 'parentUnitPrice should not be empty',
      isPositive: 'parentUnitPrice must be a positive number'
    });
    expect(validation[1].constraints).toMatchObject({
      isNotEmpty: 'photographerUnitPrice should not be empty',
      isPositive: 'photographerUnitPrice must be a positive number'
    });
  });
});
