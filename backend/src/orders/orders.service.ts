import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DbService } from '../db.service';

export interface OrderDto {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  status: string;
  totalAmount: number | null;
  paymentMethod: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItemDto[];
}

export interface OrderItemDto {
  id: number;
  orderId: number;
  productId: number | null;
  productName: string;
  sku: string;
  quantity: number;
  price: number | null;
  subtotal: number | null;
}

export interface PaginatedOrders {
  data: OrderDto[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

const VALID_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(private readonly db: DbService) {}

  private async ensureTables(): Promise<void> {
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        customer_phone VARCHAR(50),
        customer_address TEXT,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
        total_amount DECIMAL(12,0),
        payment_method VARCHAR(50),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT,
        product_name VARCHAR(255),
        sku VARCHAR(255),
        quantity INT NOT NULL DEFAULT 1,
        price DECIMAL(12,0),
        subtotal DECIMAL(12,0)
      )
    `);
  }

  async findAll(page = 1, limit = 20, status?: string, search?: string): Promise<PaginatedOrders> {
    await this.ensureTables();
    const offset = (page - 1) * limit;
    const conditions: string[] = [];
    const params: any[] = [];

    if (status && VALID_STATUSES.includes(status as any)) {
      conditions.push('o.status = ?');
      params.push(status);
    }
    if (search) {
      conditions.push('(o.customer_name LIKE ? OR o.customer_email LIKE ? OR o.customer_phone LIKE ?)');
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    const where = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';

    const countSql = `SELECT COUNT(*) AS total FROM orders o ${where}`;
    const countRows = await this.db.query<any>(countSql, params);
    const total = Number(countRows[0]?.total) || 0;
    const totalPages = Math.ceil(total / limit);

    const sql = `
      SELECT * FROM orders o ${where} ORDER BY o.created_at DESC LIMIT ? OFFSET ?
    `;
    const rows = await this.db.query<any>(sql, [...params, Number(limit), Number(offset)]);

    const data: OrderDto[] = [];
    for (const r of rows) {
      const items = await this.db.query<any>(
        'SELECT * FROM order_items WHERE order_id = ?', [String(r.id)],
      );
      data.push(this.mapOrder(r, items));
    }

    return { data, meta: { total, page, limit, totalPages } };
  }

  async findOne(id: number): Promise<OrderDto | null> {
    await this.ensureTables();
    const rows = await this.db.query<any>('SELECT * FROM orders WHERE id = ?', [String(id)]);
    if (rows.length === 0) return null;

    const items = await this.db.query<any>(
      'SELECT * FROM order_items WHERE order_id = ?', [String(id)],
    );
    return this.mapOrder(rows[0], items);
  }

  async create(data: {
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    customerAddress?: string;
    paymentMethod?: string;
    notes?: string;
    items: Array<{
      productId?: number;
      productName: string;
      sku?: string;
      quantity: number;
      price?: number;
    }>;
  }): Promise<{ id: number }> {
    await this.ensureTables();

    if (!data.customerName || data.customerName.trim().length === 0) {
      throw new BadRequestException('Customer name is required');
    }
    if (!data.items || data.items.length === 0) {
      throw new BadRequestException('Order must have at least one item');
    }

    let totalAmount = 0;
    const validatedItems = data.items.map((item) => {
      if (!item.productName || item.productName.trim().length === 0) {
        throw new BadRequestException('Each order item must have a product name');
      }
      const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
      const price = item.price != null ? Math.max(0, Number(item.price)) : 0;
      const subtotal = qty * price;
      totalAmount += subtotal;
      return { ...item, quantity: qty, price, subtotal };
    });

    const orderResult = await this.db.query<any>(
      `INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, payment_method, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending') RETURNING id`,
      [
        data.customerName.trim(),
        data.customerEmail?.trim() || null,
        data.customerPhone?.trim() || null,
        data.customerAddress?.trim() || null,
        String(totalAmount),
        data.paymentMethod?.trim() || null,
        data.notes?.trim() || null,
      ],
    );
    const orderId = orderResult[0].id;

    for (const item of validatedItems) {
      await this.db.query(
        `INSERT INTO order_items (order_id, product_id, product_name, sku, quantity, price, subtotal)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          String(orderId),
          item.productId != null ? String(item.productId) : null,
          item.productName.trim(),
          item.sku?.trim() || null,
          String(item.quantity),
          String(item.price),
          String(item.subtotal),
        ],
      );
    }

    return { id: orderId };
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.ensureTables();
    if (!VALID_STATUSES.includes(status as any)) {
      throw new BadRequestException(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    const existing = await this.db.query<any>('SELECT id, status FROM orders WHERE id = ?', [String(id)]);
    if (existing.length === 0) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    const current = existing[0].status;
    const transitions: Record<string, string[]> = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['shipped', 'cancelled'],
      shipped: ['delivered'],
      delivered: [],
      cancelled: [],
    };

    if (!transitions[current]?.includes(status)) {
      throw new BadRequestException(
        `Cannot transition order from '${current}' to '${status}'. Allowed: ${(transitions[current] || []).join(', ') || 'none'}`,
      );
    }

    await this.db.query('UPDATE orders SET status = ? WHERE id = ?', [status, String(id)]);
  }

  async update(id: number, data: {
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    customerAddress?: string;
    paymentMethod?: string;
    notes?: string;
    status?: string;
    [key: string]: any;
  }): Promise<void> {
    await this.ensureTables();
    const existing = await this.db.query<any>('SELECT id FROM orders WHERE id = ?', [String(id)]);
    if (existing.length === 0) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    const fields: string[] = [];
    const params: any[] = [];
    const fieldMap: Record<string, string> = {
      customerName: 'customer_name', customerEmail: 'customer_email',
      customerPhone: 'customer_phone', customerAddress: 'customer_address',
      paymentMethod: 'payment_method', notes: 'notes',
    };

    for (const [key, col] of Object.entries(fieldMap)) {
      if (data[key] !== undefined) {
        fields.push(`${col} = ?`);
        params.push(data[key] !== null ? String(data[key]).trim() : null);
      }
    }

    if (data.status) {
      if (!VALID_STATUSES.includes(data.status as any)) {
        throw new BadRequestException(`Invalid status: ${data.status}`);
      }
      fields.push('status = ?');
      params.push(data.status);
    }

    if (fields.length === 0) return;
    params.push(String(id));
    await this.db.query(`UPDATE orders SET ${fields.join(', ')} WHERE id = ?`, params);
  }

  private mapOrder(row: any, items: any[]): OrderDto {
    return {
      id: Number(row.id),
      customerName: row.customer_name || '',
      customerEmail: row.customer_email || '',
      customerPhone: row.customer_phone || '',
      customerAddress: row.customer_address || '',
      status: row.status || 'pending',
      totalAmount: row.total_amount ? Number(row.total_amount) : null,
      paymentMethod: row.payment_method || '',
      notes: row.notes || '',
      createdAt: row.created_at ? String(row.created_at) : '',
      updatedAt: row.updated_at ? String(row.updated_at) : '',
      items: (items || []).map((i) => ({
        id: Number(i.id),
        orderId: Number(i.order_id),
        productId: i.product_id ? Number(i.product_id) : null,
        productName: i.product_name || '',
        sku: i.sku || '',
        quantity: Number(i.quantity),
        price: i.price ? Number(i.price) : null,
        subtotal: i.subtotal ? Number(i.subtotal) : null,
      })),
    };
  }
}
