module.exports={
    conf:{
        name: 'invite',
        description: "Allows you to have the bot's link with permissions or not",
        usage: '<prefix>invite',
        aliases: ["inv", "link"],
        dir: "zbot",
    },
    run: (client, message, args) => {
        const eight = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`;
        const zero = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot`;

        message.reply({embeds: [{
            color: client.color.messagecolor.greyple,
            author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
            thumbnail: { url: client.user.avatarURL() },
            fields: [{
                    name: client.language.INVITE[0],
                    value: `[${client.language.INVITE[2]}](${eight})`
                },
                {
                    name: client.language.INVITE[1],
                    value: `[${client.language.INVITE[2]}](${zero})`
              }],
            footer: { text: `${client.user.username} ©`, icon_url: client.user.avatarURL() },
            timestamp: new Date(),
        }]})
    }
}