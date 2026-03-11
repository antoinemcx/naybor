module.exports = {
    token: process.env.BOT_TOKEN, // Do not touch, edit in .env
    prefix: '!', // Bot prefix for classic commands
    owner: "", // ID of the bot owner
    db: { // Do not touch, edit in .env
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    serverID: "", // Your main server ID
    logChannel: "", // The channel where logs will be posted (in the server defined up there)
    
    emotes: { // Feel free to put some custom emotes (obviously recommended)
        v: `✅`,
        x: `❌`,
        music: `🎵`,
        info: `:information_source:`,
        bot: `🤖`,
        stats: `📊`,
        pin: `📌`,
        system: `💻`,
        config: `⚙️`,
        cooldown: `⏰`,
        musiccd: `💿`,
        loopmode: `🔁`,
        micro: `🎙️`,
        volume: `🔉`
    },

    filters: ['Flat', 'Classical', 'Club', 'Dance', 'FullBass', 'FullBassTreble', 'Headphones', 'LargeHall', 'Live', 'Party', 'Pop', 'Reggae', 'Rock', 'Ska', 'Soft', 'SoftRock', 'Techno'],
};


// Made with ❤️ by meliooff (https://github.com/antoinemcx)