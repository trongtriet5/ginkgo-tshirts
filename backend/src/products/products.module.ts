import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MysqlService } from '../mysql.service';

@Module({
  providers: [ProductsService, MysqlService],
  controllers: [ProductsController],
})
export class ProductsModule {}
