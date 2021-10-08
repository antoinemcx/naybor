const { findServer } = require("../../database/functions");

module.exports={
    conf:{
        name: 'help',
        description: 'Send help page / Send help command.',
        usage: '<prefix>help [commandName]',
        aliases: ["h", "halp", "commands"],
        dir: 'zbot'
    },
    run :async (bot, message, args) => {
        const guild = await findServer(bot, message.guild.id);
        const prefix = guild !== undefined && guild.prefix !== null ? guild.prefix : bot.config.prefix;

        const cat = {
            music: `${bot.emotes.music} ${bot.language.HELP_CAT[0]}`,
            zbot: `<:bot:793496888618778641> ${bot.user.username}`,
            configuration: `<:config:793773514406100992> Configuration`
        }

        if(!args[0]) {
            let categorie = [];
            await bot.commandes.forEach(async(c) =>{
                if (!categorie.includes(c.conf.dir)) {await categorie.push(c.conf.dir)}
            });

            message.channel.send({embed: { // [text](link) ● [text](link)..
                color: bot.color.messagecolor.greyple,
                author: { name: bot.language.HELP(bot.user.username), icon_url: bot.user.avatarURL() },
                thumbnail: { url: bot.user.avatarURL({size: 1024}) },
                description: `**↬** [\`${bot.language.HELP_EMBED[0]} ${bot.user.username}\`](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot)
**↬** \`${prefix}help <commandName>\` ${bot.language.HELP_EMBED[1]}`,
                fields: categorie.sort().map(c => {
                    let commands = message.author.id === bot.config.owner ? bot.commandes.filter((command) => command.conf.dir === c) : bot.commandes.filter((command) => command.conf.dir === c && command.conf.private !== true);
                    return {
                        name: `${cat[c]} (${commands.size})`,
                        value: commands.map((command) => `\`${command.conf.name}\``).join(', '),
                    };
                }),
                footer: { text: `${bot.user.username} ©` },
                timestamp: new Date()
            }})

        } else {
            let command = args[0];
            if (bot.commandes.has(command)) {
                command = bot.commandes.get(command);
            }else if(bot.aliases.has(command)){
                command = bot.commandes.get(bot.aliases.get(command));
            }
            if(!command.conf) return message.channel.send(bot.language.HELP_ERR(module.exports.conf.usage));
            var re = /<prefix>/gi;
            let tosend=[];

            if(command.conf.aliases.length === 0){
                tosend.push(bot.language.HELP_CMD[0])
            }else{
                for(var i = 0; i < command.conf.aliases.length; i++){
                    let alises = `<prefix>${command.conf.aliases[i]}`;
                    tosend.push(alises.replace(re, prefix))
                }
            }
            let usage = command.conf.usage;

            message.channel.send({
                embed: {
                    color: bot.color.messagecolor.greyple,
                    author: { name: `help - ${command.conf.name}`, icon_url: message.author.displayAvatarURL({dynamic: true}) },
                    thumbnail: { url: bot.user.avatarURL({size: 1024}) },
                    description: `**↬** Prefix : \`${prefix}\`\n**↬** [] = \`${bot.language.HELP_CMD[1]}\` / <> = \`${bot.language.HELP_CMD[2]}\`\n**»** \`${command.conf.description}\`\nᅠ`,
                    fields: [{
                            name: bot.language.HELP_CMD[3],
                            value: cat[command.conf.dir] ? cat[command.conf.dir] : command.conf.dir,
                            inline: true
                        },
                        {
                            name: bot.language.HELP_CMD[4],
                            value: command.conf.cooldown ? `\`${command.conf.cooldown} ${bot.language.HELP_CMD[5]}\`` : `\`3 ${bot.language.HELP_CMD[5]}\``,
                            inline: true
                        },
                        {
                            name: 'Aliases',
                            value: tosend.map(a=>`\`${a}\``).join(', '),
                            inline: true
                        },
                        {
                            name: 'Usage',
                            value: `\`${usage.replace(re, prefix)}\``
                        },
                    ],
                    footer: { icon_url: bot.user.avatarURL(), text: `${bot.user.username} ©` },
                    timestamp: new Date()
                }
            }).catch(e => {
                bot.emit("error", e, message);
            });
        }
    }
}