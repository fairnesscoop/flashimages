import { ICommand } from 'src/Application/ICommand';

export class UpdateSchoolProductCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly parentUnitPrice: number,
    public readonly photographerUnitPrice: number
  ) {}
}
