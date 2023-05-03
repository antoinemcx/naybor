const { Client, Collection, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildVoiceStates ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
});
module.exports = client;

const fs = require('fs');
const { Player } = require('discord-player');

//SET COLLECTION
client.commandes = new Collection();
client.aliases = new Collection();
cooldowns = new Collection();

//SET UTILS
client.color = require('./utils/color.js');
client.db = require('./database/db');
client.player = new Player(client, {
    deafenOnJoin: true,
    lagMonitor: 1000,
    ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});
client.config = require('./config.js');
client.emotes = client.config.emotes;
client.filters = client.config.filters;
client.commands = new Collection();

require('./utils/errorHandler')(client);
client.player.extractors.loadDefault();


client.player.events.on('playerStart', (queue, track) => { queue.metadata.channel.send(client.language.TRACKSTART(track.title, queue.connection.packets.state.channel_id)) })
.on('emptyChannel', (queue) => queue.metadata.channel.send(client.language.CHANNELEMPTY))
.on('playerError', (queue, error) => { queue.metadata.channel.send(`Error`); console.log(error) })
.on('error', (queue, error) => {
    switch (error) {
        case 'NotPlaying':
            queue.metadata.channel.send(client.language.ERROR[0]);
            break;
        case 'NotConnected':
            queue.metadata.channel.send(client.language.PLAY_ERROR[0]);
            break;
        case 'UnableToJoin':
            queue.metadata.channel.send(client.language.ERROR[1]);
            break;
    };
})

// ==================== LOADER ==================== //
console.clear();
console.log('\x1b[36m%s\x1b[0m', "Naybor is loading, please wait...")
console.log(' ')
sleep(1050)
console.clear();
console.log('#\n\n')

fs.readdir("./event/", (err, files) => {
    sleep(500);

    if (err) console.log(err);
    files.forEach(file => {
        const event = require(`./event/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
    console.log("\x1b[32m", `* ${files.length} events loaded.`)
});

fs.readdir('./utils/', (err, files) => {
    sleep(500);

    if (err) console.log(err);
    files.forEach((f) => {
        if (f === 'migration.js') return;
        client[f.split('.')[0]] = require(`./utils/${f}`);
    });
    console.log("\x1b[32m", `* ${files.length} utilities loaded.`);
});

fs.readdir('./language/', (err, files) => {
    sleep(500);

    if (err) console.log(err);
    files.forEach((f) => {
        client[f.split('.')[0]] = require(`./language/${f}`);
    });
    console.log("\x1b[32m", `* ${files.length} languages loaded.`);
});

fs.readdir("./command/", (err, files) => {
    sleep(500);

    if (err) console.log(err);
    files.forEach(dir => {
        fs.readdir('./command/'+ dir +'/', (err, file) => {
            if (err) console.log(err);
            file.forEach(f => {
                const props = require(`./command/${dir}/${f}`);
                client.commandes.set(props.conf.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.conf.name);
                });
            });
        })
    });
    console.log("\x1b[32m", `* ${files.length} categories loaded.`)
});
  
client.login(client.config.token);

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


// Made with ❤️ by meliooff (https://github.com/antoinemcx)
