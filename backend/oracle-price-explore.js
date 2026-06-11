const oracledb = require('oracledb');

async function run() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: 'reportuser',
      password: 'report',
      connectString: '103.147.186.59:1521/rproods'
    });

    // Get INVN_ITEM_PRICE schema
    const cols = await connection.execute(
      `SELECT COLUMN_NAME, DATA_TYPE FROM ALL_TAB_COLUMNS WHERE OWNER = 'RPS' AND TABLE_NAME = 'INVN_ITEM_PRICE' ORDER BY COLUMN_ID`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('=== INVN_ITEM_PRICE columns ===');
    cols.rows.forEach(r => console.log(`  ${r.COLUMN_NAME}: ${r.DATA_TYPE}`));

    // Sample row from INVN_ITEM_PRICE
    const priceSample = await connection.execute(
      `SELECT * FROM RPS.INVN_ITEM_PRICE WHERE ROWNUM <= 2`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('\n=== Sample INVN_ITEM_PRICE rows ===');
    priceSample.rows.forEach(r => console.log(JSON.stringify(r)));

    // Now test the JOIN between INVN_SBS_ITEM and INVN_ITEM_PRICE
    const joined = await connection.execute(
      `SELECT 
         i.DESCRIPTION4   AS name,
         i.UDF5_STRING    AS code,
         i.ITEM_SIZE      AS size,
         i.ATTRIBUTE      AS color,
         p.PRICE          AS price
       FROM RPS.INVN_SBS_ITEM i
       JOIN RPS.INVN_ITEM_PRICE p ON p.SID = i.SID
       WHERE i.ACTIVE = 1
         AND ROWNUM <= 5`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('\n=== JOIN result (sample 5 rows) ===');
    joined.rows.forEach(r => console.log(JSON.stringify(r)));

  } catch (err) {
    console.error('Error:', err.message);
    // Try alternative join key
    let c2;
    try {
      c2 = await oracledb.getConnection({
        user: 'reportuser',
        password: 'report',
        connectString: '103.147.186.59:1521/rproods'
      });
      // Check foreign key constraints
      const fks = await c2.execute(
        `SELECT a.column_name, a.table_name, c.r_owner, c_pk.table_name r_table, c_pk.constraint_name
         FROM all_cons_columns a
         JOIN all_constraints c ON a.owner = c.owner AND a.constraint_name = c.constraint_name
         JOIN all_constraints c_pk ON c.r_owner = c_pk.owner AND c.r_constraint_name = c_pk.constraint_name
         WHERE c.constraint_type = 'R' AND a.owner = 'RPS' AND (a.table_name = 'INVN_ITEM_PRICE' OR c_pk.table_name = 'INVN_SBS_ITEM')`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      console.log('\n=== Foreign keys linking INVN_SBS_ITEM ↔ INVN_ITEM_PRICE ===');
      fks.rows.forEach(r => console.log(JSON.stringify(r)));
    } catch(e2) {
      console.error('FK query error:', e2.message);
    } finally {
      if (c2) await c2.close();
    }
  } finally {
    if (connection) await connection.close();
  }
}

run();
