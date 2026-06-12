import { Controller, Post, Body, UseGuards, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const token = await this.adminService.validateCredentials(body.username, body.password);
    return { token };
  }

  @Get('me')
  async me(@Headers('authorization') auth: string) {
    if (!auth || !auth.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing token');
    }
    const payload = this.adminService.verifyToken(auth.slice(7));
    return { id: payload.id, username: payload.username, displayName: payload.displayName };
  }
}
