import { Injectable, Logger } from '@nestjs/common';
import { OracleService } from '../oracle.service';

export interface ProductDto {
  id: string;
  name: string;
  code: string;
  color: string;
  price: number | null;
  category: string;
  sizes: string[];
}

export interface ProductDetailDto extends ProductDto {
  size: string;
  availableColors: string[];
  availableSizes: string[];
}

export interface PaginatedProducts {
  data: ProductDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly oracle: OracleService) {}

  async findAll(page: number = 1, limit: number = 20): Promise<PaginatedProducts> {
    try {
      const offset = (page - 1) * limit;

      // Count total unique items (grouping by DESCRIPTION4, UDF5_STRING, ATTRIBUTE)
      const countSql = `
        SELECT COUNT(*) AS TOTAL
        FROM (
          SELECT i.DESCRIPTION4, i.UDF5_STRING, i.ATTRIBUTE
          FROM RPS.INVN_SBS_ITEM i
          WHERE i.ACTIVE = 1
            AND i.DESCRIPTION4 IS NOT NULL
          GROUP BY i.DESCRIPTION4, i.UDF5_STRING, i.ATTRIBUTE
        )
      `;
      const countResult = await this.oracle.query<any>(countSql);
      const total = countResult[0]?.TOTAL || 0;
      const totalPages = Math.ceil(total / limit);

      // Fetch paginated data, collapsed by name, code, color
      const sql = `
        SELECT 
          TO_CHAR(MAX(i.SID))   AS SID,
          i.DESCRIPTION4        AS NAME,
          i.UDF5_STRING         AS CODE,
          i.ATTRIBUTE           AS COLOR,
          MAX(p.PRICE)          AS PRICE
        FROM RPS.INVN_SBS_ITEM i
        LEFT JOIN RPS.INVN_SBS_PRICE p ON p.INVN_SBS_ITEM_SID = i.SID
        WHERE i.ACTIVE = 1
          AND i.DESCRIPTION4 IS NOT NULL
        GROUP BY i.DESCRIPTION4, i.UDF5_STRING, i.ATTRIBUTE
        ORDER BY SID DESC
        OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
      `;

      const rows = await this.oracle.query<any>(sql, [offset, limit]);

      // Build a map of name+code+color → sizes[]
      const sizesSql = `
        SELECT
          i.DESCRIPTION4 AS NAME,
          i.UDF5_STRING AS CODE,
          i.ATTRIBUTE AS COLOR,
          i.ITEM_SIZE AS ITEM_SIZE
        FROM RPS.INVN_SBS_ITEM i
        WHERE i.ACTIVE = 1
          AND i.DESCRIPTION4 IS NOT NULL
          AND i.ITEM_SIZE IS NOT NULL
        GROUP BY i.DESCRIPTION4, i.UDF5_STRING, i.ATTRIBUTE, i.ITEM_SIZE
        ORDER BY i.ITEM_SIZE
      `;
      const sizeRows = await this.oracle.query<any>(sizesSql);
      const sizeMap = new Map<string, string[]>();
      for (const sr of sizeRows) {
        const key = `${sr.NAME}|${sr.CODE || ''}|${sr.COLOR || ''}`;
        if (!sizeMap.has(key)) sizeMap.set(key, []);
        const arr = sizeMap.get(key)!;
        if (!arr.includes(sr.ITEM_SIZE)) arr.push(sr.ITEM_SIZE);
      }

      const data = rows.map((r) => {
        const key = `${r.NAME}|${r.CODE || ''}|${r.COLOR || ''}`;
        return {
          id: r.SID,
          name: r.NAME || 'Unnamed Product',
          code: r.CODE || '',
          color: r.COLOR || '',
          price: r.PRICE ? Number(r.PRICE) : null,
          category: 'Clothing',
          sizes: sizeMap.get(key) || [],
        };
      });

      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      this.logger.error(`Failed to fetch products: ${error.message}`);
      return {
        data: [],
        meta: { total: 0, page, limit, totalPages: 0 },
      };
    }
  }

  async findOne(id: string): Promise<ProductDetailDto | null> {
    try {
      const sql = `
        SELECT
          i.SID,
          i.DESCRIPTION4 AS NAME,
          i.UDF5_STRING AS CODE,
          i.ATTRIBUTE AS COLOR,
          i.ITEM_SIZE AS ITEM_SIZE,
          MAX(p.PRICE) AS PRICE
        FROM RPS.INVN_SBS_ITEM i
        LEFT JOIN RPS.INVN_SBS_PRICE p ON p.INVN_SBS_ITEM_SID = i.SID
        WHERE i.SID = :sid
        GROUP BY i.SID, i.DESCRIPTION4, i.UDF5_STRING, i.ATTRIBUTE, i.ITEM_SIZE
      `;
      const rows = await this.oracle.query<any>(sql, [id]);
      if (rows.length === 0) return null;

      const product = rows[0];

      const siblingsSql = `
        SELECT
          i.ATTRIBUTE AS COLOR,
          i.ITEM_SIZE AS ITEM_SIZE
        FROM RPS.INVN_SBS_ITEM i
        WHERE i.DESCRIPTION4 = :name
          AND i.UDF5_STRING = :code
          AND i.ACTIVE = 1
      `;
      const siblings = await this.oracle.query<any>(siblingsSql, [product.NAME, product.CODE]);

      const colors = [...new Set(siblings.map(s => s.COLOR).filter(Boolean))];
      const sizes = [...new Set(siblings.map(s => s.ITEM_SIZE).filter(Boolean))];

      if (product.COLOR && !colors.includes(product.COLOR)) colors.push(product.COLOR);
      if (product.ITEM_SIZE && !sizes.includes(product.ITEM_SIZE)) sizes.push(product.ITEM_SIZE);

      return {
        id: String(product.SID),
        name: product.NAME || 'Unnamed Product',
        code: product.CODE || '',
        color: product.COLOR || '',
        size: product.ITEM_SIZE || '',
        price: product.PRICE ? Number(product.PRICE) : null,
        category: 'Clothing',
        sizes,
        availableColors: colors,
        availableSizes: sizes,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch product ${id}: ${error.message}`);
      return null;
    }
  }
}
