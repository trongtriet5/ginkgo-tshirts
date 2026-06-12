import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

const JWT_SECRET = 'ginkgo-cms-secret-key-2024';
const JWT_EXPIRES_IN = '24h';

interface AdminUser {
  id: number;
  username: string;
  passwordHash: string;
  displayName: string;
}

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);
  private adminCache: AdminUser[] | null = null;

  private readonly defaultAdmin: AdminUser = {
    id: 1,
    username: 'admin',
    passwordHash: this.hashPassword('Ginkgo@2024'),
    displayName: 'Admin',
  };

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  async validateCredentials(username: string, password: string): Promise<string> {
    const admin = this.defaultAdmin;

    if (username !== admin.username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hash = this.hashPassword(password);
    if (hash !== admin.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return jwt.sign(
      { id: admin.id, username: admin.username, displayName: admin.displayName },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );
  }

  verifyToken(token: string): { id: number; username: string; displayName: string } {
    try {
      return jwt.verify(token, JWT_SECRET) as any;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
