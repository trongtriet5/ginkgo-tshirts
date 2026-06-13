import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DbService } from '../db.service';
import { lookupCategory, getPrefixesForGroup, getAllTypeGroups } from './category-mapping';

export interface ProductDto {
  id: string;
  name: string;
  code: string;
  color: string;
  price: number | null;
  category: string;
  typeDetail: string;
  typeGroup: string;
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

export interface FilterOptions {
  sizes: string[];
  colors: string[];
  categoryGroups: string[];
}

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(private readonly db: DbService) {}

  async findAll(
    page: number = 1,
    limit: number = 20,
    search?: string,
    size?: string,
    color?: string,
    categoryGroup?: string,
    productGroup?: string,
  ): Promise<PaginatedProducts> {
    try {
      const offset = (page - 1) * limit;

      const conditions: string[] = ['p.active = 1', "p.product_name IS NOT NULL AND p.product_name != ''"];
      const params: any[] = [];

      if (productGroup) {
        conditions.push('p.product_group = ?');
        params.push(productGroup);
      }

      if (search) {
        conditions.push(
          '(LOWER(p.product_name) LIKE LOWER(?) OR LOWER(p.sku) LIKE LOWER(?) OR LOWER(p.type_name_detail_en) LIKE LOWER(?))',
        );
        const s = `%${search}%`;
        params.push(s, s, s);
      }

      const sizes = size
        ? size.split(',').map((s) => s.trim()).filter(Boolean)
        : [];
      const colors = color
        ? color.split(',').map((c) => c.trim()).filter(Boolean)
        : [];

      if (sizes.length > 0) {
        conditions.push(`p.size IN (${sizes.map(() => '?').join(',')})`);
        params.push(...sizes);
      }
      if (colors.length > 0) {
        conditions.push(`p.color IN (${colors.map(() => '?').join(',')})`);
        params.push(...colors);
      }

      const categoryGroups = categoryGroup
        ? categoryGroup.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const whereClause = conditions.join(' AND ');

      // Fetch ALL products matching size/color/search (no pagination, no category filter)
      const sql = `
        SELECT 
          MAX(p.id)             AS SID,
          p.product_name        AS NAME,
          CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design) AS CODE,
          p.color               AS COLOR,
          MAX(p.price)          AS PRICE
        FROM products p
        WHERE ${whereClause}
        GROUP BY p.product_name, CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design), p.color
        ORDER BY SID DESC
      `;
      const rows = await this.db.query<any>(sql, params);

      // Compute typeGroup for each product and filter by categoryGroup in JS
      const allProducts = rows.map((r) => {
        const cat = lookupCategory(r.CODE || '');
        return {
          id: r.SID,
          name: r.NAME || r.type_name_detail_en || r.sku || 'Unnamed Product',
          code: r.CODE || '',
          color: r.COLOR || '',
          price: r.PRICE ? Number(r.PRICE) : null,
          category: cat ? cat.typeGroup : 'Clothing',
          typeDetail: cat?.typeDetail || '',
          typeGroup: cat?.typeGroup || '',
        };
      });

      const filtered = categoryGroups.length > 0
        ? allProducts.filter((p) => categoryGroups.includes(p.typeGroup))
        : allProducts;

      // Build size map ONLY for filtered products
      const filteredKeys = new Set(
        filtered.map((p) => `${p.name}|${p.code}|${p.color}`),
      );

      const sizesParams: any[] = [...params];
      // Remove size params from sizes query (we want ALL sizes per product)
      // sizes were added at the end of params before the WHERE clause
      // We need to rebuild sizesParams without size filters
      const sizesConditions: string[] = ['p.active = 1', "p.product_name IS NOT NULL AND p.product_name != ''", "p.size IS NOT NULL AND p.size != '0'"];
      const sizesP: any[] = [];
      if (productGroup) {
        sizesConditions.push('p.product_group = ?');
        sizesP.push(productGroup);
      }
      if (search) {
        sizesConditions.push(
          '(LOWER(p.product_name) LIKE LOWER(?) OR LOWER(p.sku) LIKE LOWER(?) OR LOWER(p.type_name_detail_en) LIKE LOWER(?))',
        );
        const s = `%${search}%`;
        sizesP.push(s, s, s);
      }
      if (colors.length > 0) {
        sizesConditions.push(`p.color IN (${colors.map(() => '?').join(',')})`);
        sizesP.push(...colors);
      }

      const sizesSql = `
        SELECT
          p.product_name AS NAME,
          CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design) AS CODE,
          p.color AS COLOR,
          p.size AS ITEM_SIZE
        FROM products p
        WHERE ${sizesConditions.join(' AND ')}
        GROUP BY p.product_name, CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design), p.color, p.size
        ORDER BY p.size
      `;
      const sizeRows = await this.db.query<any>(sizesSql, sizesP);
      const sizeMap = new Map<string, string[]>();
      for (const sr of sizeRows) {
        const key = `${sr.NAME}|${sr.CODE || ''}|${sr.COLOR || ''}`;
        if (!filteredKeys.has(key)) continue;
        if (!sizeMap.has(key)) sizeMap.set(key, []);
        const arr = sizeMap.get(key)!;
        if (!arr.includes(sr.ITEM_SIZE)) arr.push(sr.ITEM_SIZE);
      }

      // Paginate filtered results
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);
      const paginatedData = filtered.slice(offset, offset + limit);

      const data = paginatedData.map((p) => ({
        ...p,
        sizes: sizeMap.get(`${p.name}|${p.code}|${p.color}`) || [],
      }));

      return {
        data,
        meta: { total, page, limit, totalPages },
      };
    } catch (error) {
      this.logger.error(`Failed to fetch products: ${error.message}`);
      return {
        data: [],
        meta: { total: 0, page, limit, totalPages: 0 },
      };
    }
  }

  async getFilterOptions(
    categoryGroup?: string,
    size?: string,
    color?: string,
    productGroup?: string,
  ): Promise<FilterOptions> {
    try {
      const conditions: string[] = ['p.active = 1', "p.product_name IS NOT NULL AND p.product_name != ''"];
      const params: any[] = [];

      if (productGroup) {
        conditions.push('p.product_group = ?');
        params.push(productGroup);
      }

      if (categoryGroup) {
        const groups = categoryGroup.split(',').map((s) => s.trim()).filter(Boolean);
        const prefixes = groups.flatMap((g) => getPrefixesForGroup(g));
        if (prefixes.length > 0) {
          conditions.push(`(${prefixes.map(() => "CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design) LIKE ?").join(' OR ')})`);
          prefixes.forEach((pref) => params.push(`${pref}.%`));
        }
      }
      if (size) {
        const sizes = size.split(',').map((s) => s.trim()).filter(Boolean);
        conditions.push(`p.size IN (${sizes.map(() => '?').join(',')})`);
        params.push(...sizes);
      }
      if (color) {
        const colors = color.split(',').map((c) => c.trim()).filter(Boolean);
        conditions.push(`p.color IN (${colors.map(() => '?').join(',')})`);
        params.push(...colors);
      }

      const whereClause = conditions.join(' AND ');

      const sizeSql = `
        SELECT DISTINCT p.size AS ITEM_SIZE
        FROM products p
        WHERE ${whereClause} AND p.size IS NOT NULL AND p.size != '0'
        ORDER BY p.size
      `;
      const sizeRows = await this.db.query<any>(sizeSql, params);

      const colorSql = `
        SELECT DISTINCT p.color AS COLOR
        FROM products p
        WHERE ${whereClause} AND p.color IS NOT NULL
        ORDER BY p.color
      `;
      const colorRows = await this.db.query<any>(colorSql, params);

      const sizes = sizeRows.map((r: any) => r.ITEM_SIZE);
      const colors = colorRows.map((r: any) => r.COLOR);

      const categoryGroups = getAllTypeGroups();

      return { sizes, colors, categoryGroups };
    } catch (error) {
      this.logger.error(`Failed to fetch filter options: ${error.message}`);
      return { sizes: [], colors: [], categoryGroups: [] };
    }
  }

  async findOne(id: string): Promise<ProductDetailDto | null> {
    try {
      const sql = `
        SELECT
          p.id AS SID,
          p.product_name AS NAME,
          CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design) AS CODE,
          p.color AS COLOR,
          p.size AS ITEM_SIZE,
          MAX(p.price) AS PRICE,
          p.type_name_detail_en AS TYPE_DETAIL
        FROM products p
        WHERE p.id = ?
        GROUP BY p.id, p.product_name, CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design), p.color, p.size, p.type_name_detail_en
      `;
      const rows = await this.db.query<any>(sql, [id]);
      if (rows.length === 0) return null;

      const product = rows[0];

      const siblingsSql = `
        SELECT
          p.color AS COLOR,
          p.size AS ITEM_SIZE
        FROM products p
        WHERE p.product_name = ?
          AND CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design) = ?
          AND p.active = 1
      `;
      const siblings = await this.db.query<any>(siblingsSql, [
        product.NAME,
        product.CODE,
      ]);

      const colors = [...new Set(siblings.map((s) => s.COLOR).filter(Boolean))];
      const sizes = [
        ...new Set(siblings.map((s) => s.ITEM_SIZE).filter(Boolean)),
      ];

      if (product.COLOR && !colors.includes(product.COLOR))
        colors.push(product.COLOR);
      if (product.ITEM_SIZE && !sizes.includes(product.ITEM_SIZE))
        sizes.push(product.ITEM_SIZE);

      const cat = lookupCategory(product.CODE || '');

      return {
        id: String(product.SID),
        name: product.NAME || product.TYPE_DETAIL || 'Unnamed Product',
        code: product.CODE || '',
        color: product.COLOR || '',
        size: product.ITEM_SIZE || '',
        price: product.PRICE ? Number(product.PRICE) : null,
        category: cat ? cat.typeGroup : 'Clothing',
        typeDetail: cat?.typeDetail || '',
        typeGroup: cat?.typeGroup || '',
        sizes,
        availableColors: colors,
        availableSizes: sizes,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch product ${id}: ${error.message}`);
      return null;
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Admin CRUD                                                         */
  /* ------------------------------------------------------------------ */

  async adminFindAll(page = 1, limit = 20, search?: string): Promise<any> {
    const offset = (page - 1) * limit;
    const conditions: string[] = [];
    const params: any[] = [];

    if (search) {
      conditions.push('(p.product_name LIKE ? OR p.sku LIKE ? OR p.upc LIKE ?)');
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    const countSql = `SELECT COUNT(*) AS total FROM (SELECT MAX(p.id) AS id FROM products p ${where} GROUP BY p.product_name, CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design), p.color) sub`;
    const countRows = await this.db.query<any>(countSql, params);
    const total = Number(countRows[0]?.total) || 0;
    const totalPages = Math.ceil(total / limit);

    const sql = `
      SELECT
        MAX(p.id) AS SID,
        p.upc,
        p.product_group,
        p.product_name AS NAME,
        p.sku,
        p.fabric, p.gender, p.category, p.style, p.design,
        p.color AS COLOR,
        string_agg(DISTINCT p.size, ',') AS ITEM_SIZE,
        MAX(p.price) AS PRICE,
        p.type_name_detail_en,
        p.type_name_group,
        MAX(p.active) AS ACTIVE
      FROM products p
      ${where}
      GROUP BY p.product_name, CONCAT(p.fabric, '.', p.gender, '.', p.category, '.', p.style, '.', p.design), p.color, p.upc, p.product_group, p.sku, p.fabric, p.gender, p.category, p.style, p.design, p.type_name_detail_en, p.type_name_group
      ORDER BY MAX(p.id) DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;
    const rows = await this.db.query<any>(sql, params);

    const data = rows.map((r) => ({
      id: r.SID,
      upc: r.upc,
      productGroup: r.product_group,
      name: r.NAME || r.type_name_detail_en || 'Unnamed Product',
      sku: r.sku,
      fabric: r.fabric,
      gender: r.gender,
      category: r.category,
      style: r.style,
      design: r.design,
      color: r.COLOR || '',
      size: r.ITEM_SIZE || '',
      price: r.PRICE ? Number(r.PRICE) : null,
      typeNameDetailEn: r.type_name_detail_en,
      typeNameGroup: r.type_name_group,
      active: r.ACTIVE === '1' || r.ACTIVE === 1,
    }));

    return { data, meta: { total, page, limit, totalPages } };
  }

  async create(data: {
    upc?: string;
    productGroup?: string;
    productName: string;
    sku?: string;
    fabric?: string;
    gender?: string;
    category?: string;
    style?: string;
    design?: string;
    color?: string;
    size?: string;
    price?: number;
    typeNameDetailEn?: string;
    typeNameGroup?: string;
  }): Promise<{ id: number }> {
    if (!data.productName || data.productName.trim().length === 0) {
      throw new BadRequestException('Product name is required');
    }

    const sql = `
      INSERT INTO products (upc, product_group, product_name, sku, fabric, gender, category, style, design, color, size, price, type_name_detail_en, type_name_group, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
      RETURNING id
    `;
    const result = await this.db.query<any>(sql, [
      data.upc || null,
      data.productGroup || null,
      data.productName.trim(),
      data.sku || null,
      data.fabric || null,
      data.gender || null,
      data.category || null,
      data.style || null,
      data.design || null,
      data.color || null,
      data.size || null,
      data.price != null ? String(data.price) : null,
      data.typeNameDetailEn || null,
      data.typeNameGroup || null,
    ]);
    return { id: Number(result[0]?.id) || 0 };
  }

  async update(id: number, data: {
    upc?: string;
    productGroup?: string;
    productName?: string;
    sku?: string;
    fabric?: string;
    gender?: string;
    category?: string;
    style?: string;
    design?: string;
    color?: string;
    size?: string;
    price?: number;
    typeNameDetailEn?: string;
    typeNameGroup?: string;
    [key: string]: any;
  }): Promise<void> {
    const existing = await this.db.query<any>('SELECT id FROM products WHERE id = ?', [String(id)]);
    if (existing.length === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const fields: string[] = [];
    const params: any[] = [];

    const fieldMap: Record<string, string> = {
      upc: 'upc', productGroup: 'product_group', productName: 'product_name',
      sku: 'sku', fabric: 'fabric', gender: 'gender', category: 'category',
      style: 'style', design: 'design', color: 'color', size: 'size',
      typeNameDetailEn: 'type_name_detail_en', typeNameGroup: 'type_name_group',
    };

    for (const [key, col] of Object.entries(fieldMap)) {
      if (data[key] !== undefined) {
        fields.push(`${col} = ?`);
        params.push(data[key] !== null ? String(data[key]) : null);
      }
    }
    if (data.price !== undefined) {
      fields.push('price = ?');
      params.push(data.price != null ? String(data.price) : null);
    }

    if (fields.length === 0) return;

    params.push(String(id));
    await this.db.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, params);
  }

  async delete(id: number): Promise<void> {
    const existing = await this.db.query<any>('SELECT id FROM products WHERE id = ?', [String(id)]);
    if (existing.length === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.db.query('UPDATE products SET active = 0 WHERE id = ?', [String(id)]);
  }

  async restore(id: number): Promise<void> {
    await this.db.query('UPDATE products SET active = 1 WHERE id = ?', [String(id)]);
  }
}
