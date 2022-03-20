const { Client, Collection } = require("discord.js");
const bot = new Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false
    },
});
module.exports = bot;

const fs = require('fs');
const { Player } = require('discord-player');

//SET COLLECTION
bot.commandes = new Collection();
bot.aliases = new Collection();
cooldowns = new Collection();

//SET UTILS
bot.logger = require('./utils/logger');
bot.color = require('./utils/color.js');
bot.db = require('./database/db');
bot.player = new Player(bot);
bot.config = require('./config.js');
bot.emotes = bot.config.emotes;
bot.filters = bot.config.filters;
bot.commands = new Collection();

require('./utils/errorHandler')(bot);


bot.player.on('trackStart', (queue, track) => { queue.metadata.send(bot.language.TRACKSTART(track.title, queue.connection.channel)) })
.on('trackAdd', (queue, track) => queue.metadata.send(bot.language.TRACKADD(track)))
.on('playlistAdd', (queue, playlist) => queue.metadata.send(bot.language.PLAYLISTADD(playlist)))
// .on('searchResults', (queue, query, tracks) => {
//     queue.metadata.send({
//         embeds: [{
//             color: bot.color.messagecolor.greyple,
//             author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
//             description: `${tracks.map((t, i) => `\`${i + 1}.\` [${t.title}](${t.url})`).join('\n')}\n\n${bot.language.SEARCHRESULTS}`,
//             footer: { text: `${bot.user.username} ©`, icon_url: bot.user.avatarURL() },
//             timestamp: new Date(),
//         }],
//     });
// })
// .on('searchInvalidResponse', (queue, query, tracks, content, collector) => {
//     if (content === 'cancel') {
//         collector.stop();
//         return queue.metadata.send(bot.language.SEARCHINVALIDRESPONSE);
//     } else queue.metadata.send(bot.language.SEARCHERROR(tracks.length));
// })
// .on('searchCancel', (queue, query, tracks) => queue.metadata.send(bot.language.SEARCHCANCEL))
.on('noResults', (queue, query) => queue.metadata.send(bot.language.NORESULTS(query)))
.on('queueEnd', (queue) => queue.metadata.send(bot.language.QUEUEEND))
.on('botDisconnect', (queue) => queue.metadata.send(bot.language.BOTDISCONNECT))
.on('channelEmpty', (queue) => queue.metadata.send(bot.language.CHANNELEMPTY))
.on('connectionError', (queue, error) => { queue.metadata.send(`Error`); console.log(error) })
.on('error', (queue, error) => {
    switch (error) {
        case 'NotPlaying':
            queue.metadata.send(bot.language.ERROR[0]);
            break;
        case 'NotConnected':
            queue.metadata.send(bot.language.PLAY_ERROR[0]);
            break;
        case 'UnableToJoin':
            queue.metadata.send(bot.language.ERROR[1]);
            break;
    };
})

//LOADER ALL FILE AND COMMANDS
fs.readdir("./command/", (err, files) => {
    if (err) bot.logger.error(err);
    files.forEach(dir => {
      fs.readdir('./command/'+ dir +'/', (err, file) => {
        if (err) bot.logger.error(err);
        bot.logger.loader(`${bot.color.chalkcolor.magenta('[CATEGORY] ')} ${bot.color.chalkcolor.blue(`${dir}`)} loading...`);
        file.forEach(f => {
          const props = require(`./command/${dir}/${f}`);
          bot.logger.loader(`[COMMANDE] ${bot.color.chalkcolor.cyanBright(`${f}`)} is load`);
          bot.commandes.set(props.conf.name, props);
          props.conf.aliases.forEach(alias => {
            bot.aliases.set(alias, props.conf.name);
          });
        });
        bot.logger.loader(`${bot.color.chalkcolor.magenta('[CATEGORY]')} ${bot.color.chalkcolor.red('[FINISH]')} ${bot.color.chalkcolor.blue(`${dir}`)} is load`)
      })
    });
  });

  //LOADER ALL EVENT
 fs.readdir("./event/", (err, files) => {
    if (err) bot.logger.error(err);
    files.forEach(file => {
      const event = require(`./event/${file}`);
      let eventName = file.split(".")[0];
      bot.logger.loader(`[EVENT] ${bot.color.chalkcolor.green(`${eventName}.js`)} is load`);
      bot.on(eventName, event.bind(null, bot));
    });
    bot.logger.loader(`[EVENT] ${bot.color.chalkcolor.red('[FINISH]')} ${files.length} events loaded`)
  });
 
 //LOADER ALL UTILS FILES
  fs.readdir('./utils/', (err, files) => {
    if (err) bot.logger.error(err);
    files.forEach((f) => {
      bot.logger.loader(`[UTILS] ${bot.color.chalkcolor.green(f)} is load`);
      bot[f.split('.')[0]] = require(`./utils/${f}`);
    });
    bot.logger.loader(`[UTILS] ${bot.color.chalkcolor.red('[FINISH]')} ${files.length} utilities loaded`);
  });

  fs.readdir('./language/', (err, files) => {
    if (err) bot.logger.error(err);
    files.forEach((f) => {
      bot.logger.loader(`[LANG] ${bot.color.chalkcolor.green(f)} is load`);
      bot[f.split('.')[0]] = require(`./language/${f}`);
    });
    bot.logger.loader(`[LANG] ${bot.color.chalkcolor.red('[FINISH]')} ${files.length} languages loaded`);
  });
  
bot.login(bot.config.token);