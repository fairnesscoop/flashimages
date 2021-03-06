import {
  Controller,
  Inject,
  Post,
  Body,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateEventCommand } from 'src/Application/Calendar/Command/CreateEventCommand';
import { ICommandBus } from 'src/Application/ICommandBus';
import { UserRole } from 'src/Domain/User/User.entity';
import { Roles } from 'src/Infrastructure/User/Decorator/Roles';
import { RolesGuard } from 'src/Infrastructure/User/Security/RolesGuard';
import { EventDTO } from '../DTO/EventDTO';

@Controller('events')
@ApiTags('Calendar')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateEventAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.PHOTOGRAPHER)
  @ApiOperation({ summary: 'Create new event' })
  public async index(@Body() dto: EventDTO) {
    const { date, schoolId, userId, summary } = dto;

    try {
      const id = await this.commandBus.execute(
        new CreateEventCommand(
          new Date(date),
          userId,
          schoolId,
          summary
        )
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
