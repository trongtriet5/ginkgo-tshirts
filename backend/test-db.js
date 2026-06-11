const sql = require('mssql')

const config = {
  user: 'ginkgo',
  password: 'Bachqua@123.com',
  server: 'Sme.dbsqlcloud.com',
  port: 56147,
  database: 'ginkgo_ebiz',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true // Change to true for local dev / self-signed certs
  }
}

async function run() {
  try {
    await sql.connect(config)
    console.log('Connected to DB');
    
    // Query table schema
    const result = await sql.query`SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'product'`;
    console.log('Product Table Schema:');
    console.table(result.recordset);

    // Get a sample product to see the data
    const sample = await sql.query`SELECT TOP 1 * FROM product`;
    console.log('Sample Product:', sample.recordset[0]);

  } catch (err) {
    console.error(err)
  } finally {
    process.exit(0);
  }
}

run();
