const oracledb = require('oracledb');
const path = require('path');
const fs = require('fs');

// Try to find Oracle Instant Client in common locations
const icLocations = [
  'C:\\instantclient',
  'C:\\instantclient_21_3',
  'C:\\instantclient_19_11',
  'C:\\oracle\\instantclient',
  path.join(process.env.USERPROFILE || '', 'instantclient'),
];

let icPath = null;
for (const loc of icLocations) {
  if (fs.existsSync(loc)) {
    icPath = loc;
    break;
  }
}

async function run() {
  let connection;
  try {
    if (icPath) {
      console.log(`Found Oracle Instant Client at: ${icPath}`);
      oracledb.initOracleClient({ libDir: icPath });
      console.log('Thick mode enabled');
    } else {
      console.log('No Oracle Instant Client found on disk. Trying thin mode...');
    }

    connection = await oracledb.getConnection({
      user: 'reportuser',
      password: 'report',
      connectString: '103.147.186.59:1521/rproods'
    });

    console.log('Connected! Oracle version:', connection.oracleServerVersionString);

    // Look for tables owned by RPS
    const result = await connection.execute(
      `SELECT TABLE_NAME FROM ALL_TABLES WHERE OWNER = 'RPS' ORDER BY TABLE_NAME`,
      [],
      { maxRows: 50 }
    );
    console.log('Tables in RPS schema:');
    result.rows.forEach(r => console.log(' -', r[0]));

  } catch (err) {
    console.error('Oracle error:', err.message);
    if (err.message.includes('NJS-116') || err.message.includes('DPY-6001')) {
      console.log('\n>>> SOLUTION: Oracle Instant Client needed for thick mode <<<');
      console.log('Download from: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html');
      console.log('Extract to C:\\instantclient then rerun this script.');
    }
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

run();
