import { ShootingStatus } from 'src/Domain/School/Shooting.entity';

export class ShootingView {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly status: ShootingStatus,
    public readonly shootingDate: Date,
    public readonly groupClosingDate: Date,
    public readonly individualClosingDate: Date,
    public readonly notice?: string,
  ) {}
}
