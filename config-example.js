module.exports = {
    token: '', //Token of the bot
    prefix: '', //Bot prefix for classic commands
    owner: "", //ID of the bot owner
    db: { //This repo uses a mariadb (mysql) database ; change these according to yours
        host: "",
        user: "",
        password: "",
        database: "",
    },
    serverID: "", //Your main server ID
    logChannel: "", //The channel where logs will be posted (in the server defined up there)
    
    emotes: { //Feel free to put some custom emotes (obviously recommended)
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