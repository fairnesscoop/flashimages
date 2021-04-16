import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarModule } from './Infrastructure/Calendar/calendar.module';
import { LeadModule } from './Infrastructure/Lead/lead.module';
import { IngestionModule } from './Infrastructure/Ingestion/ingestion.module';
import { ProductModule } from './Infrastructure/Product/product.module';
import { UserModule } from './Infrastructure/User/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    SchoolModule,
    ProductModule,
    LeadModule,
    CalendarModule,
    IngestionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
