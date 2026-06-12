import { Controller, Get, Post, Put, Param, Query, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../admin/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /* ─── Public: anyone can place an order ─── */
  @Post()
  async create(@Body() body: any) {
    return this.ordersService.create(body);
  }

  /* ─── Admin: all management endpoints require auth ─── */
  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.ordersService.findAll(
      parseInt(page) || 1, parseInt(limit) || 20, status, search,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(parseInt(id, 10));
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    await this.ordersService.update(parseInt(id, 10), body);
    return { success: true };
  }

  @UseGuards(AuthGuard)
  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    await this.ordersService.updateStatus(parseInt(id, 10), body.status);
    return { success: true };
  }
}
