const oracledb = require('oracledb');

async function run() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: 'reportuser',
      password: 'report',
      connectString: '103.147.186.59:1521/rproods'
    });

    // Final production query using Oracle syntax (no AS for table aliases)
    const joined = await connection.execute(
      `SELECT 
         i.DESCRIPTION4      name,
         i.UDF5_STRING       code,
         i.ITEM_SIZE         itemsize,
         i.ATTRIBUTE         color,
         MAX(p.PRICE)        price
       FROM RPS.INVN_SBS_ITEM i
       LEFT JOIN RPS.INVN_SBS_PRICE p ON p.INVN_SBS_ITEM_SID = i.SID
       WHERE i.ACTIVE = 1
         AND i.DESCRIPTION4 IS NOT NULL
       GROUP BY i.SID, i.DESCRIPTION4, i.UDF5_STRING, i.ITEM_SIZE, i.ATTRIBUTE
       ORDER BY i.SID DESC
       FETCH FIRST 10 ROWS ONLY`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    console.log('=== Final joined products ===');
    joined.rows.forEach(r => console.log(JSON.stringify(r)));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    if (connection) await connection.close();
  }
}

run();
