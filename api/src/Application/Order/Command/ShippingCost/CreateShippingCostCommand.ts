import { ICommand } from 'src/Application/ICommand';

export class CreateShippingCostCommand implements ICommand {
  constructor(
    public readonly weight: number,
    public readonly price: number
  ) {}
}
