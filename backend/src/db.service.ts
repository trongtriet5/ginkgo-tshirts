import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DbService.name);
  private pool: Pool;

  async onModuleInit() {
    try {
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });
      // Test connection
      await this.pool.query('SELECT NOW()');
      this.logger.log('PostgreSQL connection pool created successfully');
    } catch (err) {
      this.logger.error(`Failed to create PostgreSQL pool: ${err.message}`);
    }
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      // Convert positional '?' placeholders to Postgres '$1', '$2', ... placeholders
      let index = 1;
      const pgSql = sql.replace(/\?/g, () => `$${index++}`);
      
      const res = await this.pool.query(pgSql, params);
      return res.rows as T[];
    } catch (err) {
      this.logger.error(`PostgreSQL query error: ${err.message}`);
      this.logger.error(`Failed SQL: ${sql} | Params: ${JSON.stringify(params)}`);
      throw err;
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
