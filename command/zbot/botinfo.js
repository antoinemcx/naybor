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
        let owner = bot.users.cache.get(bot.config.owner);

        message.reply({embeds: [{
            color: bot.color.messagecolor.greyple,
            author: { name: bot.user.username, icon_url: bot.user.avatarURL() },
            description: bot.language.BOTINFO_DESCRIPTION(bot.user.username),
            fields: [{
                name: `<:bot:954865650059317319> ${bot.user.username}`,
                value: `${bot.language.BOTINFO[0]} : \`${owner.username}#${owner.discriminator}\``
            },
            {
                name: `<:stats:954865652492030032> ${bot.language.BOTINFO[5]}`,
                value: `${bot.language.BOTINFO[2]} : \`${bot.guilds.cache.size} ${bot.language.BOTINFO[3]}\`
${bot.language.BOTINFO[4]} : \`${bot.channels.cache.size.toLocaleString()} ${bot.language.BOTINFO[4].toLowerCase()}\`
${bot.language.BOTINFO[6]} : \`${bot.voice.adapters.size.toLocaleString()} ${bot.language.BOTINFO[4].toLowerCase()}\`
${bot.language.BOTINFO[7]} : \`${bot.commandes.size} ${bot.language.BOTINFO[7].toLowerCase()}\``
            },
            {
                name: `<:pin:954865652479443004> Versions`,
                value: `Discord.JS : \`${djsversion}\`\nNode.JS : \`${process.version}\``
            },
            {
                name: `<:system:954865649774116935> ${bot.language.BOTINFO[8]}`,
                value: `${bot.language.BOTINFO[9]} : \`${process.platform}\` | Arch : \`${os.arch()}\`\nConfig : \`${os.cpus().map(i => `${i.model}`)[0]}\`
RAM : \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\`/\`${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\`\n
**↬** [\`${bot.language.HELP_EMBED[0]} ${bot.user.username}\`](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)`
            }]
        }]})
    }
};