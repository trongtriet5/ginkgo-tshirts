import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MysqlService } from '../mysql.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, MysqlService],
})
export class OrdersModule {}
