import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { OracleService } from '../oracle.service';

@Module({
  providers: [ProductsService, OracleService],
  controllers: [ProductsController],
})
export class ProductsModule {}

