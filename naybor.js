const { Client, Collection } = require("discord.js");
const client = new Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false
    },
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
client.player = new Player(client);
client.config = require('./config.js');
client.emotes = client.config.emotes;
client.filters = client.config.filters;
client.commands = new Collection();

require('./utils/errorHandler')(client);


client.player.on('trackStart', (queue, track) => { queue.metadata.send(client.language.TRACKSTART(track.title, queue.connection.channel)) })
.on('trackAdd', (queue, track) => queue.metadata.send(client.language.TRACKADD(track)))
.on('playlistAdd', (queue, playlist) => queue.metadata.send(client.language.PLAYLISTADD(playlist)))
// .on('searchResults', (queue, query, tracks) => {
//     queue.metadata.send({
//         embeds: [{
//             color: client.color.messagecolor.greyple,
//             author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
//             description: `${tracks.map((t, i) => `\`${i + 1}.\` [${t.title}](${t.url})`).join('\n')}\n\n${client.language.SEARCHRESULTS}`,
//             footer: { text: `${client.user.username} ©`, icon_url: client.user.avatarURL() },
//             timestamp: new Date(),
//         }],
//     });
// })
// .on('searchInvalidResponse', (queue, query, tracks, content, collector) => {
//     if (content === 'cancel') {
//         collector.stop();
//         return queue.metadata.send(client.language.SEARCHINVALIDRESPONSE);
//     } else queue.metadata.send(client.language.SEARCHERROR(tracks.length));
// })
// .on('searchCancel', (queue, query, tracks) => queue.metadata.send(client.language.SEARCHCANCEL))
.on('noResults', (queue, query) => queue.metadata.send(client.language.NORESULTS(query)))
.on('queueEnd', (queue) => queue.metadata.send(client.language.QUEUEEND))
.on('botDisconnect', (queue) => queue.metadata.send(client.language.BOTDISCONNECT))
.on('channelEmpty', (queue) => queue.metadata.send(client.language.CHANNELEMPTY))
.on('connectionError', (queue, error) => { queue.metadata.send(`Error`); console.log(error) })
.on('error', (queue, error) => {
    switch (error) {
        case 'NotPlaying':
            queue.metadata.send(client.language.ERROR[0]);
            break;
        case 'NotConnected':
            queue.metadata.send(client.language.PLAY_ERROR[0]);
            break;
        case 'UnableToJoin':
            queue.metadata.send(client.language.ERROR[1]);
            break;
    };
})

// ==================== LOADER ==================== //
console.clear();
console.log('\x1b[36m%s\x1b[0m', "Naybor is loading, please wait...")
console.log(' ')
sleep(1050)
console.clear();

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
            console.log("\x1b[32m", `* ${dir} category loaded.`)
        })
    });
});
  
client.login(client.config.token);

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}