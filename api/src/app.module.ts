import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarModule } from './Infrastructure/Calendar/calendar.module';
import { OrderModule } from './Infrastructure/Order/order.module';
import { ProductModule } from './Infrastructure/Product/product.module';
import { SchoolModule } from './Infrastructure/School/school.module';
import { UserModule } from './Infrastructure/User/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    SchoolModule,
    ProductModule,
    OrderModule,
    CalendarModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
