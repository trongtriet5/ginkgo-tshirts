import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class MysqlService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MysqlService.name);
  private pool: Pool;

  async onModuleInit() {
    try {
      this.pool = createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'triet123',
        database: 'ginkgo_tshirt',
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0,
      });
      this.logger.log('MySQL connection pool created successfully');
    } catch (err) {
      this.logger.error(`Failed to create MySQL pool: ${err.message}`);
    }
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows as T[];
    } catch (err) {
      this.logger.error(`MySQL query error: ${err.message}`);
      throw err;
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
