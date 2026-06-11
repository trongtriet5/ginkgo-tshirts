const oracledb = require('oracledb');

async function run() {
  let connection;

  try {
    // Note: Since node-oracledb 6.0, it uses a Pure JavaScript Thin mode by default
    connection = await oracledb.getConnection({
      user: 'reportuser',
      password: 'report',
      connectString: '103.147.186.59:1521/rproods'
    });

    console.log('Successfully connected to Oracle Database');

    // Query the schema of RPS.PRODUCT
    const result = await connection.execute(
      `SELECT COLUMN_NAME, DATA_TYPE 
       FROM ALL_TAB_COLUMNS 
       WHERE OWNER = 'RPS' AND UPPER(TABLE_NAME) = 'INVN_SBS_ITEM'`, 
       // In Retail Pro (which often has schema RPS and user reportuser/rproods), product table is usually INVN_SBS_ITEM or INVN_SBS. Let's just look for tables containing 'PRODUCT' or 'ITEM'
       // Wait, user specifically said "bảng product" (product table). Let's query tables.
    );
    
    // First, let's find the exact table name the user meant
    const tablesResult = await connection.execute(
      `SELECT TABLE_NAME FROM ALL_TABLES WHERE OWNER = 'RPS' AND UPPER(TABLE_NAME) LIKE '%PROD%' OR UPPER(TABLE_NAME) LIKE '%ITEM%' FETCH FIRST 10 ROWS ONLY`
    );
    console.log('Possible tables:', tablesResult.rows);

    const schemaResult = await connection.execute(
      `SELECT COLUMN_NAME, DATA_TYPE FROM ALL_TAB_COLUMNS WHERE OWNER = 'RPS' AND UPPER(TABLE_NAME) = 'PRODUCT'`
    );
    console.log('Schema for RPS.PRODUCT:', schemaResult.rows);

    if (schemaResult.rows.length > 0) {
      const dataResult = await connection.execute(
        `SELECT * FROM RPS.PRODUCT FETCH FIRST 1 ROWS ONLY`
      );
      console.log('Sample Data:', dataResult.rows);
    } else {
        const itemSchemaResult = await connection.execute(
            `SELECT COLUMN_NAME, DATA_TYPE FROM ALL_TAB_COLUMNS WHERE OWNER = 'RPS' AND UPPER(TABLE_NAME) = 'INVN_SBS_ITEM'`
        );
        console.log('Schema for RPS.INVN_SBS_ITEM:', itemSchemaResult.rows);
    }


  } catch (err) {
    console.error('Error connecting to Oracle:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

run();
