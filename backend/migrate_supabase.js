const { Client } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function run() {
  const directUrl = process.env.DIRECT_URL;
  if (!directUrl) {
    console.error('DIRECT_URL environment variable is missing!');
    process.exit(1);
  }

  console.log('Connecting to Supabase via Direct URL...');
  const client = new Client({ connectionString: directUrl });
  await client.connect();
  console.log('Connected!');

  try {
    // 1. Create Tables
    console.log('Creating tables if they do not exist...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        upc VARCHAR(64),
        product_group VARCHAR(255),
        product_name VARCHAR(255),
        sku VARCHAR(255),
        sku_no_size VARCHAR(255),
        fabric VARCHAR(64),
        gender VARCHAR(16),
        category VARCHAR(64),
        style VARCHAR(64),
        design VARCHAR(64),
        color VARCHAR(64),
        size VARCHAR(64),
        price VARCHAR(64),
        type_name_detail_en VARCHAR(255),
        type_name_group VARCHAR(255),
        active SMALLINT DEFAULT 1
      );
    `);

    await client.query(`
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
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT,
        product_name VARCHAR(255),
        sku VARCHAR(255),
        quantity INT NOT NULL DEFAULT 1,
        price DECIMAL(12,0),
        subtotal DECIMAL(12,0)
      );
    `);

    console.log('Tables ensured successfully.');

    // 2. Truncate Products Table
    console.log('Truncating products table...');
    await client.query('TRUNCATE TABLE products RESTART IDENTITY CASCADE');

    // 3. Read and Parse CSV
    const csvPath = path.join(__dirname, '..', 'product.csv');
    console.log(`Reading CSV from ${csvPath}...`);
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split(/\r?\n/);
    if (lines.length === 0) {
      throw new Error('CSV is empty');
    }

    const headers = lines[0].split(',').map(h => h.trim());
    console.log('CSV Headers:', headers);

    const products = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const row = [];
      let insideQuotes = false;
      let entry = '';
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          row.push(entry.trim());
          entry = '';
        } else {
          entry += char;
        }
      }
      row.push(entry.trim());

      if (row.length === headers.length) {
        const obj = {};
        headers.forEach((h, index) => {
          obj[h] = row[index];
        });
        products.push(obj);
      }
    }

    console.log(`Parsed ${products.length} products from CSV.`);

    // 4. Batch Insert Products
    console.log('Inserting products into database...');
    const batchSize = 100;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      
      await client.query('BEGIN');
      try {
        for (const p of batch) {
          const sku = p['SKU'] || '';
          const size = p['Size'] || '';
          let skuNoSize = sku;
          if (sku && size && sku.toLowerCase().endsWith('-' + size.toLowerCase())) {
            skuNoSize = sku.substring(0, sku.length - (size.length + 1));
          }

          await client.query(
            `INSERT INTO products (
              upc, product_group, product_name, sku, sku_no_size, fabric, gender, 
              category, style, design, color, size, price, 
              type_name_detail_en, type_name_group, active
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 1)`,
            [
              p['UPC'] || null,
              p['PRODUCT_GROUP'] || null,
              p['PRODUCT_NAME'] || null,
              sku || null,
              skuNoSize || null,
              p['Fabric'] || null,
              p['Gender'] || null,
              p['Category'] || null,
              p['Style'] || null,
              p['Design'] || null,
              p['Color'] || null,
              size || null,
              p['Price'] || null,
              p['TYPE_NAME_DETAIL_EN'] || null,
              p['TYPE_NAME_GROUP'] || null,
            ]
          );
        }
        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      }
      console.log(`Inserted products ${i + 1} to ${Math.min(i + batchSize, products.length)}...`);
    }

    console.log('Database migration and seeding completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await client.end();
  }
}

run();
