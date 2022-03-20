const { findServer } = require("../../database/functions");

module.exports={
    conf:{
        name: 'help',
        description: 'Send help page / Send help command.',
        usage: '<prefix>help [commandName]',
        aliases: ["h", "halp", "commands"],
        dir: 'zbot'
    },
    run :async (client, message, args) => {
        const guild = await findServer(client, message.guild.id);
        const prefix = guild !== undefined && guild.prefix !== null ? guild.prefix : client.config.prefix;

        const cat = {
            music: `${client.emotes.music} ${client.language.HELP_CAT[0]}`,
            zbot: `${client.emotes.bot} ${client.user.username}`,
            configuration: `${client.emotes.config} Configuration`
        }

        if(!args[0]) {
            let categorie = [];
            await client.commandes.forEach(async(c) =>{
                if (!categorie.includes(c.conf.dir)) {await categorie.push(c.conf.dir)}
            });

            message.reply({embeds: [{ // [text](link) ● [text](link)..
                color: client.color.messagecolor.greyple,
                author: { name: client.language.HELP(client.user.username), icon_url: client.user.avatarURL(), url: `https://github.com/meliooff/naybor` },
                thumbnail: { url: client.user.avatarURL({size: 1024}) },
                description: `**↬** [\`${client.language.HELP_EMBED[0]} ${client.user.username}\`](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)
**↬** \`${prefix}help <commandName>\` ${client.language.HELP_EMBED[1]}`,
                fields: categorie.sort().map(c => {
                    let commands = message.author.id === client.config.owner ? client.commandes.filter((command) => command.conf.dir === c) : client.commandes.filter((command) => command.conf.dir === c && command.conf.private !== true);
                    return {
                        name: `${cat[c]} (${commands.size})`,
                        value: commands.map((command) => `\`${command.conf.name}\``).join(', '),
                    };
                }),
                footer: { text: `${client.user.username} ©` },
                timestamp: new Date()
            }]})

        } else {
            let command = args[0];
            if (client.commandes.has(command)) {
                command = client.commandes.get(command);
            }else if(client.aliases.has(command)){
                command = client.commandes.get(client.aliases.get(command));
            }
            if(!command.conf) return message.channel.send(client.language.HELP_ERR(module.exports.conf.usage));
            var re = /<prefix>/gi;
            let tosend=[];

            if(command.conf.aliases.length === 0){
                tosend.push(client.language.HELP_CMD[0])
            }else{
                for(var i = 0; i < command.conf.aliases.length; i++){
                    let alises = `<prefix>${command.conf.aliases[i]}`;
                    tosend.push(alises.replace(re, prefix))
                }
            }
            let usage = command.conf.usage;

            message.reply({
                embeds: [{
                    color: client.color.messagecolor.greyple,
                    author: { name: `help - ${command.conf.name}`, icon_url: message.author.displayAvatarURL({dynamic: true}), url: `https://github.com/meliooff/naybor` },
                    thumbnail: { url: client.user.avatarURL({size: 1024}) },
                    description: `**↬** Prefix : \`${prefix}\`\n**↬** [] = \`${client.language.HELP_CMD[1]}\` / <> = \`${client.language.HELP_CMD[2]}\`\n**»** \`${command.conf.description}\`\nᅠ`,
                    fields: [{
                            name: client.language.HELP_CMD[3],
                            value: cat[command.conf.dir] ? cat[command.conf.dir] : command.conf.dir,
                            inline: true
                        },
                        {
                            name: client.language.HELP_CMD[4],
                            value: command.conf.cooldown ? `\`${command.conf.cooldown} ${client.language.HELP_CMD[5]}\`` : `\`3 ${client.language.HELP_CMD[5]}\``,
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
                    footer: { icon_url: client.user.avatarURL(), text: `${client.user.username} ©` },
                    timestamp: new Date()
                }]
            }).catch(e => {
                client.emit("error", e, message);
            });
        }
    }
}