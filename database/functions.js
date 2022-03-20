function findServer(bot, id) {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await bot.db.query(`SELECT * FROM guild WHERE guildID = ${id};`);
            resolve(rows[0]);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { findServer, }