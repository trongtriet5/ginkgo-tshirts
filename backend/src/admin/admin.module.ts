import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DbService } from '../db.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, DbService],
  exports: [AdminService],
})
export class AdminModule {}
