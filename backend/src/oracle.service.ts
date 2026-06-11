import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const oracledb = require('oracledb');

@Injectable()
export class OracleService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OracleService.name);
  private pool: any;

  async onModuleInit() {
    try {
      this.pool = await oracledb.createPool({
        user: 'reportuser',
        password: 'report',
        connectString: '103.147.186.59:1521/rproods',
        poolMin: 1,
        poolMax: 5,
        poolIncrement: 1,
      });
      this.logger.log('Oracle connection pool created successfully');
    } catch (err) {
      this.logger.error(`Failed to create Oracle pool: ${err.message}`);
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.close(0);
    }
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    let connection: any;
    try {
      connection = await this.pool.getConnection();
      const result = await connection.execute(sql, params, {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });
      return result.rows as T[];
    } finally {
      if (connection) await connection.close();
    }
  }
}
