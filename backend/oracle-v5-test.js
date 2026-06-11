const oracledb = require('oracledb');

// oracledb v5 uses thick mode by default (requires Oracle client libs)
// but has a fallback. Let's just try direct connection - v5 handles older auth natively via its bundled libs.

async function run() {
  let connection;
  try {
    console.log('oracledb version:', oracledb.versionString);
    
    connection = await oracledb.getConnection({
      user: 'reportuser',
      password: 'report',
      connectString: '103.147.186.59:1521/rproods'
    });

    console.log('Connected to Oracle! Version:', connection.oracleServerVersionString);

    // Find tables in the RPS schema
    const tables = await connection.execute(
      `SELECT TABLE_NAME FROM ALL_TABLES WHERE OWNER = 'RPS' ORDER BY TABLE_NAME`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT, maxRows: 50 }
    );
    console.log('\n=== Tables in RPS schema ===');
    tables.rows.forEach(r => console.log(' -', r.TABLE_NAME));

    // Try to get the PRODUCT table columns
    const cols = await connection.execute(
      `SELECT COLUMN_NAME, DATA_TYPE FROM ALL_TAB_COLUMNS WHERE OWNER = 'RPS' AND TABLE_NAME = 'PRODUCT' ORDER BY COLUMN_ID`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT, maxRows: 100 }
    );
    if (cols.rows.length > 0) {
      console.log('\n=== PRODUCT table columns ===');
      cols.rows.forEach(r => console.log(`  ${r.COLUMN_NAME}: ${r.DATA_TYPE}`));
      
      // Sample product
      const sample = await connection.execute(
        `SELECT * FROM RPS.PRODUCT WHERE ROWNUM <= 2`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      console.log('\n=== Sample Product ===');
      console.log(sample.rows[0]);
    } else {
      console.log('\nNo PRODUCT table found in RPS. Let me check what tables exist...');
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    if (connection) await connection.close();
  }
}

run();
