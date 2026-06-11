import { Controller, Get } from '@nestjs/common';
import { ProductsService, ProductDto } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }
}
