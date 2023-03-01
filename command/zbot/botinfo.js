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
    run :async (client, message, args) => {
        let owner = client.users.cache.get(client.config.owner);

        message.reply({embeds: [{
            color: client.color.messagecolor.greyple,
            author: { name: client.user.username, icon_url: client.user.avatarURL(), url: `https://github.com/antoinemcx/naybor` },
            description: client.language.BOTINFO_DESCRIPTION(client.user.username),
            fields: [{
                name: `${client.emotes.bot} ${client.user.username}`,
                value: `${client.language.BOTINFO[0]} : \`${owner.username}#${owner.discriminator}\``
            },
            {
                name: `${client.emotes.stats} ${client.language.BOTINFO[5]}`,
                value: `${client.language.BOTINFO[2]} : \`${client.guilds.cache.size} ${client.language.BOTINFO[3]}\`
${client.language.BOTINFO[4]} : \`${client.channels.cache.size.toLocaleString()} ${client.language.BOTINFO[4].toLowerCase()}\`
${client.language.BOTINFO[6]} : \`${client.voice.adapters.size.toLocaleString()} ${client.language.BOTINFO[4].toLowerCase()}\`
${client.language.BOTINFO[7]} : \`${client.commandes.size} ${client.language.BOTINFO[7].toLowerCase()}\``
            },
            {
                name: `${client.emotes.pin} Versions`,
                value: `Discord.JS : \`${djsversion}\`\nNode.JS : \`${process.version}\``
            },
            {
                name: `${client.emotes.system} ${client.language.BOTINFO[8]}`,
                value: `${client.language.BOTINFO[9]} : \`${process.platform}\` | Arch : \`${os.arch()}\`\nConfig : \`${os.cpus().map(i => `${i.model}`)[0]}\`
RAM : \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\`/\`${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`\n
**↬** [\`${client.language.HELP_EMBED[0]} ${client.user.username}\`](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`
            }]
        }]})
    }
};