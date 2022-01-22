module.exports={
    conf:{
        name: 'invite',
        description: "Allows you to have the bot's link with permissions or not",
        usage: '<prefix>invite',
        aliases: ["inv", "link"],
        dir: "zbot",
    },
    run: (bot, message, args) => {
        const eight = `https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`;
        const zero = `https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=0&scope=bot`;

        message.reply({embeds: [{
            color: bot.color.messagecolor.greyple,
            author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
            thumbnail: { url: bot.user.avatarURL() },
            fields: [{
                    name: bot.language.INVITE[0],
                    value: `[${bot.language.INVITE[2]}](${eight})`
                },
                {
                    name: bot.language.INVITE[1],
                    value: `[${bot.language.INVITE[2]}](${zero})`
              }],
            footer: { text: `${bot.user.username} ©`, icon_url: bot.user.avatarURL() },
            timestamp: new Date(),
        }]})
    }
}