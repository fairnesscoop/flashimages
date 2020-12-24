import { Photographer } from '../Photographer.entity';

export interface IPhotographerRepository {
  save(task: Photographer): Promise<Photographer>;
  findOneByApiToken(apiToken: string): Promise<Photographer | undefined>;
}