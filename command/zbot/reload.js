module.exports={
    conf:{
        name: 'reload',
        description: "Restart a command. Ofc, this command is private",
        usage: '<prefix>reload <cmd>',
        aliases: ["r"],
        dir: "zbot",
        private: true,
        cooldown: 3
    },
    run: (bot, message, args) => {

    if(!args[0]) return message.channel.send(bot.language.WRONG_USAGE(module.exports.conf.usage))

    let cmddb;
    if (bot.commandes.has(args[0])){
        cmddb = bot.commandes.get(args[0])
    }else if(bot.aliases.has(args[0])){
        cmddb = bot.commandes.get(bot.aliases.get(args[0]))
    }
    if(!cmddb) return message.channel.send(`${bot.emotes.x} Je ne trouve pas \`${args[0].toUpperCase()}\``)

        const dir = cmddb.conf.dir
        delete require.cache[require.resolve(`../../command/${dir}/${cmddb.conf.name}`)];
        bot.commandes.delete(args[0]);
        const props = require(`../../command/${dir}/${cmddb.conf.name}`);
        bot.commandes.set(props.conf.name, props);

        if(props.conf.aliases) {
            props.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, props.conf.name);
            });
        }
        message.react("✅")
    }
}