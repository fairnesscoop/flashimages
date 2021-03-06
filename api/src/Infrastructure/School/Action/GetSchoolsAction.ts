import { Controller, Inject, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SchoolView } from 'src/Application/School/View/SchoolView';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetSchoolsQuery } from 'src/Application/School/Query/GetSchoolsQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { UserRole } from 'src/Domain/User/User.entity';

@Controller('schools')
@ApiTags('School')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({summary: 'Get all schools'})
  public async index(
    @Query() { page }: PaginationDTO
  ): Promise<Pagination<SchoolView>> {
    return await this.queryBus.execute(new GetSchoolsQuery(page));
  }
}
