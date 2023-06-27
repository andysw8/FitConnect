const pg = require('pg')
const db = new pg.Pool({
    connectionString: "postgresql://postgres:824217@localhost:5432/fitconnect"
 
})


module.exports = db