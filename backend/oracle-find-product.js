const oracledb = require('oracledb');

async function run() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: 'reportuser',
      password: 'report',
      connectString: '103.147.186.59:1521/rproods'
    });

    // Find all tables with 'ITEM' or 'PROD' in their name
    const tables = await connection.execute(
      `SELECT TABLE_NAME FROM ALL_TABLES WHERE OWNER = 'RPS' AND (TABLE_NAME LIKE '%ITEM%' OR TABLE_NAME LIKE '%PROD%' OR TABLE_NAME LIKE '%INVEN%') ORDER BY TABLE_NAME`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('Item/Product related tables:');
    tables.rows.forEach(r => console.log(' -', r.TABLE_NAME));

    // Check schema of INVN_SBS_ITEM (Retail Pro standard product table)
    const cols = await connection.execute(
      `SELECT COLUMN_NAME, DATA_TYPE FROM ALL_TAB_COLUMNS WHERE OWNER = 'RPS' AND TABLE_NAME = 'INVN_SBS_ITEM' ORDER BY COLUMN_ID`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT, maxRows: 60 }
    );
    if (cols.rows.length > 0) {
      console.log('\n=== INVN_SBS_ITEM columns ===');
      cols.rows.forEach(r => console.log(`  ${r.COLUMN_NAME}: ${r.DATA_TYPE}`));

      const sample = await connection.execute(
        `SELECT * FROM RPS.INVN_SBS_ITEM WHERE ROWNUM <= 1`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      console.log('\nSample row:');
      console.log(JSON.stringify(sample.rows[0], null, 2));
    }

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    if (connection) await connection.close();
  }
}

run();
