module.exports = {
    token: '',
    prefix: '',
    owner: "", //ID of the bot owner
    db: { //This repo uses a mariadb (mysql) database ; change these according to yours
        host: "",
        user: "",
        password: "",
        database: "",
    },
    
    emotes: { //Feel free to put some custom emotes
        v: `✅`,
        x: `❌`,
        music: `🎵`,
        info: `:information_source:`
    },

    filters: ['8D', 'gate', 'haas', 'phaser', 'treble', 'tremolo', 'vibrato', 'reverse', 'karaoke', 'flanger', 'mcompand', 'pulsator', 'subboost', 'bassboost', 'vaporwave', 'nightcore', 'normalizer', 'surrounding'],
};
