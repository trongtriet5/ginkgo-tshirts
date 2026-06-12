import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../admin/guards/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /* ─── Public ─── */

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('search') search?: string,
    @Query('size') size?: string,
    @Query('color') color?: string,
    @Query('categoryGroup') categoryGroup?: string,
    @Query('productGroup') productGroup?: string,
  ) {
    return this.productsService.findAll(
      parseInt(page) || 1, parseInt(limit) || 20,
      search, size, color, categoryGroup, productGroup,
    );
  }

  @Get('meta/filters')
  async getFilters(
    @Query('categoryGroup') categoryGroup?: string,
    @Query('size') size?: string,
    @Query('color') color?: string,
    @Query('productGroup') productGroup?: string,
  ) {
    return this.productsService.getFilterOptions(categoryGroup, size, color, productGroup);
  }



  /* ─── Admin (auth) ─── */

  @UseGuards(AuthGuard)
  @Get('admin/all')
  async adminFindAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('search') search?: string,
  ) {
    return this.productsService.adminFindAll(
      parseInt(page) || 1, parseInt(limit) || 20, search,
    );
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    await this.productsService.update(parseInt(id, 10), body);
    return { success: true };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.productsService.delete(parseInt(id, 10));
    return { success: true };
  }

  @UseGuards(AuthGuard)
  @Post(':id/restore')
  async restore(@Param('id') id: string) {
    await this.productsService.restore(parseInt(id, 10));
    return { success: true };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
