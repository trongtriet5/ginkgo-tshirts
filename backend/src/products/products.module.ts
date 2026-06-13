import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DbService } from '../db.service';

@Module({
  providers: [ProductsService, DbService],
  controllers: [ProductsController],
})
export class ProductsModule {}
