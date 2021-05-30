import { ShippingCost } from '../ShippingCost.entity';

export interface IShippingCostRepository {
  save(shippingcost: ShippingCost): Promise<ShippingCost>;
  findOneByGrams(grams: number): Promise<ShippingCost | undefined>;
}
