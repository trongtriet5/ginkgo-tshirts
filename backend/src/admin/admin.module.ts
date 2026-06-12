import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MysqlService } from '../mysql.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, MysqlService],
  exports: [AdminService],
})
export class AdminModule {}
