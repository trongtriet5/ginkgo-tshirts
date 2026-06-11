import { Injectable, Logger } from '@nestjs/common';
import { OracleService } from '../oracle.service';

export interface ProductDto {
  id: string;
  name: string;
  code: string;
  size: string;
  color: string;
  price: number | null;
  category: string;
}

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly oracle: OracleService) {}

  async findAll(): Promise<ProductDto[]> {
    try {
      const sql = `
        SELECT 
          TO_CHAR(i.SID)        AS SID,
          i.DESCRIPTION4        AS NAME,
          i.UDF5_STRING         AS CODE,
          i.ITEM_SIZE           AS ITEMSIZE,
          i.ATTRIBUTE           AS COLOR,
          MAX(p.PRICE)          AS PRICE
        FROM RPS.INVN_SBS_ITEM i
        LEFT JOIN RPS.INVN_SBS_PRICE p ON p.INVN_SBS_ITEM_SID = i.SID
        WHERE i.ACTIVE = 1
          AND i.DESCRIPTION4 IS NOT NULL
        GROUP BY i.SID, i.DESCRIPTION4, i.UDF5_STRING, i.ITEM_SIZE, i.ATTRIBUTE
        ORDER BY i.SID DESC
        FETCH FIRST 50 ROWS ONLY
      `;

      const rows = await this.oracle.query<any>(sql);

      return rows.map((r) => ({
        id: r.SID,
        name: r.NAME || 'Unnamed Product',
        code: r.CODE || '',
        size: r.ITEMSIZE || '',
        color: r.COLOR || '',
        price: r.PRICE ? Number(r.PRICE) : null,
        category: 'Clothing',
      }));
    } catch (error) {
      this.logger.error(`Failed to fetch products: ${error.message}`);
      return [];
    }
  }
}
