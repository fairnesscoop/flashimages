import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPhotographerRepository } from 'src/Domain/User/Repository/IPhotographerRepository';
import { Photographer } from 'src/Domain/User/Photographer.entity';

@Injectable()
export class PhotographerRepository implements IPhotographerRepository {
  constructor(
    @InjectRepository(Photographer)
    private readonly repository: Repository<Photographer>
  ) {}

  public save(photographer: Photographer): Promise<Photographer> {
    return this.repository.save(photographer);
  }

  public findOneByApiToken(apiToken: string): Promise<Photographer | undefined> {
    return this.repository
      .createQueryBuilder('photographer')
      .select([
        'photographer.id',
        'photographer.firstName',
        'photographer.lastName',
        'photographer.email'
      ])
      .where('photographer.apiToken = :apiToken', { apiToken })
      .getOne();
  }
}