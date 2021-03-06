import { Controller, Inject, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { IdDTO } from 'src/Infrastructure/Common/DTO/IdDTO';
import { SchoolProductView } from 'src/Application/School/View/SchoolProductView';
import { GetSchoolProductsQuery } from 'src/Application/School/Query/Product/GetSchoolProductsQuery';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { UserRole } from 'src/Domain/User/User.entity';

@Controller('schools')
@ApiTags('School product')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetSchoolProductsAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get(':id/products')
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Get school products '})
  public async index(@Param() dto: IdDTO): Promise<SchoolProductView[]> {
    try {
      return await this.queryBus.execute(new GetSchoolProductsQuery(dto.id));
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
