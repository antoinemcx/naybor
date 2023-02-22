const db = require('../database/db');

db.query(`CREATE TABLE IF NOT EXISTS guild (
    guildID VARCHAR(200) NOT NULL PRIMARY KEY,
    lang VARCHAR(45) DEFAULT 'en',
    prefix VARCHAR(45) DEFAULT 'n!'
)`, (err) => {
    if (err) {
        console.log(err);
        return db.end();
    }
}).then(() => {
    console.log('Table guild created');
    db.end();
    return process.exit();
})