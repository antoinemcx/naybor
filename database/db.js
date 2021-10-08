const mariadb = require('mariadb');
const config = require('../../music/config');

const db = mariadb.createPool({
     host: config.db.host, 
     user: config.db.user, 
     password: config.db.password,
     database: config.db.database,
     connectionLimit: 5
})

db.getConnection().then(() => console.log("MariaDB connected")).catch(err => {
      console.log(err)
    });

module.exports = db;