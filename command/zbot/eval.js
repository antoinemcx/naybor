const util = require("util");

module.exports = {
    conf: {
        name: "eval",
        description: "Permet d'évaluer un code JavaScript",
        usage: "<prefix>eval <eval>",
        aliases: ["e"],
        dir: "zbot",
        private: true,
        cooldown: 3
    },
    run: (client, message, args) => {
        let code = args.join(' ');
        try {
            let ev = eval(code)
            let str = util.inspect(ev, {
                depth: 1
            })

            str = `${str.replace(new RegExp(`${client.token}`, "g"), "nop?")}`;
            if(str.length > 1900) {
                str = str.substr(0, 1900)
                str = str + "..."
            }

            message.react('832595223564779541');
            message.reply({embeds: [{
                author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}), url: `https://github.com/antoinemcx/naybor` },
                color: client.color.messagecolor.greyple,
                description: `\`\`\`JS\n${str}\`\`\``,
                timestamp: new Date(),
                footer: { text: client.user.username, icon_url: client.user.avatarURL() }
            }]})
            
        } catch (err) {
            message.react('832595223602659379');
            message.reply({embeds: [{
                author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}), url: `https://github.com/antoinemcx/naybor` },
                color: client.color.messagecolor.red,
                description: `\`\`\`JS\n${err}\`\`\``,
                timestamp: new Date(),
                footer: { text: client.user.username, icon_url: client.user.avatarURL() }
            }]})
        }
    }
}