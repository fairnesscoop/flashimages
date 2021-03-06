import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/Domain/Product/Product.entity';
import { IProductRepository } from 'src/Domain/Product/Repository/IProductRepository';
import { MAX_ITEMS_PER_PAGE } from 'src/Application/Common/Pagination';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ) {}

  public save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  public remove(product: Product): void {
    this.repository.delete(product.getId());
  }

  public findOneByTitle(title: string): Promise<Product | undefined> {
    return this.repository
      .createQueryBuilder('product')
      .select([
        'product.id'
      ])
      .where('lower(product.title) = :title', { title: title.toLowerCase() })
      .getOne();
  }

  public findOneById(id: string): Promise<Product | undefined> {
    return this.repository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.title',
        'product.weight',
        'product.description',
        'product.unitPrice'
      ])
      .where('product.id = :id', { id })
      .getOne();
  }

  public findProducts(page = 1): Promise<[Product[], number]> {
    return this.repository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.title',
        'product.description',
        'product.weight',
        'product.unitPrice'
      ])
      .orderBy('product.title', 'ASC')
      .limit(MAX_ITEMS_PER_PAGE)
      .offset((page - 1) * MAX_ITEMS_PER_PAGE)
      .getManyAndCount();
  }

  public findProductsToImport(): Promise<Product[]> {
    return this.repository
      .createQueryBuilder('product')
      .select([ 'product.id', 'product.unitPrice' ])
      .getMany();
  }
}
