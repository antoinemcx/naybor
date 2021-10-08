const os = require("os");
const { version: djsversion } = require('discord.js');

module.exports={
    conf:{
        name: 'botinfo',
        description: 'Allows you to see informations about the bot and also the developper',
        usage: '<prefix>botinfo',
        aliases: ["bi"],
        dir: 'zbot'
    },
    run :async (bot, message, args) => {
        const Contributors = [
            '741747137506836531'
        ];
        message.channel.send({embed: {
            color: bot.color.messagecolor.greyple,
            author: { name: bot.user.username, icon_url: bot.user.avatarURL() },
            description: bot.language.BOTINFO_DESCRIPTION(bot.user.username),
            fields: [{
                name: `<:bot:793496888618778641> ${bot.user.username}`,
                value: `${bot.language.BOTINFO[0]} : \`${bot.users.cache.get(bot.config.owner).tag}\`\n${bot.language.BOTINFO[1]} : ${Contributors.map(c=>`\`${bot.users.cache.get(c).tag}\``).join(' - ')}`
            },
            {
                name: `<:stats:793506201518211112> ${bot.language.BOTINFO[5]}`,
                value: `${bot.language.BOTINFO[2]} : \`${bot.guilds.cache.size} ${bot.language.BOTINFO[3]}\`
${bot.language.BOTINFO[4]} : \`${bot.channels.cache.size.toLocaleString()} ${bot.language.BOTINFO[4].toLowerCase()}\`\n${bot.language.BOTINFO[6]} : \`${bot.voice.connections.size} ${bot.language.BOTINFO[4].toLowerCase()}\`
${bot.language.BOTINFO[7]} : \`${bot.commandes.size} ${bot.language.BOTINFO[7].toLowerCase()}\``
            },
            {
                name: `<:pin:793547713588887572> Versions`,
                value: `Discord.JS : \`${djsversion}\`\nNode.JS : \`${process.version}\``
            },
            {
                name: `<:system:793510108339372072> ${bot.language.BOTINFO[8]}`,
                value: `${bot.language.BOTINFO[9]} : \`${process.platform}\` | Arch : \`${os.arch()}\`\nConfig : \`${os.cpus().map(i => `${i.model}`)[0]}\`
RAM : \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\`/\`${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`\n
**↬** [\`${bot.language.HELP_EMBED[0]} ${bot.user.username}\`](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`
            }]
        }})
    }
};