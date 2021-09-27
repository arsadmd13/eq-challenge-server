const pg = require('pg');

var pool = new pg.Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

(async () => {
  var client = await pool.connect()
})().then((e) => {
  console.log("Connected to PG DB")
}).catch(e => {
  console.error(e.message)
})

module.exports = pool;