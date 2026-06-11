const oracledb = require('oracledb');

async function run() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: 'reportuser',
      password: 'report',
      connectString: '103.147.186.59:1521/rproods'
    });

    // Get INVN_SBS_PRICE columns
    const cols = await connection.execute(
      `SELECT COLUMN_NAME, DATA_TYPE FROM ALL_TAB_COLUMNS 
       WHERE OWNER = 'RPS' AND TABLE_NAME = 'INVN_SBS_PRICE' ORDER BY COLUMN_ID`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('=== INVN_SBS_PRICE columns ===');
    cols.rows.forEach(r => console.log(`  ${r.COLUMN_NAME}: ${r.DATA_TYPE}`));

    // Sample INVN_SBS_PRICE row
    const priceSample = await connection.execute(
      `SELECT * FROM RPS.INVN_SBS_PRICE WHERE ROWNUM <= 2`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('\n=== Sample INVN_SBS_PRICE rows ===');
    priceSample.rows.forEach(r => console.log(JSON.stringify(r, null, 2)));

    // Test the full join
    const joined = await connection.execute(
      `SELECT 
         i.DESCRIPTION4      AS name,
         i.UDF5_STRING       AS code,
         i.ITEM_SIZE         AS size,
         i.ATTRIBUTE         AS color,
         p.PRICE             AS price
       FROM RPS.INVN_SBS_ITEM i
       JOIN RPS.INVN_SBS_PRICE p ON p.INVN_SBS_ITEM_SID = i.SID
       WHERE i.ACTIVE = 1
         AND ROWNUM <= 5`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('\n=== JOIN result (sample 5 products) ===');
    joined.rows.forEach(r => console.log(JSON.stringify(r)));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    if (connection) await connection.close();
  }
}

run();
