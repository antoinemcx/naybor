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
    run: (client, message, args) => {
        if(!args[0]) return message.reply(client.language.WRONG_USAGE(module.exports.conf.usage))

        let cmddb;
        if (client.commandes.has(args[0])){
            cmddb = client.commandes.get(args[0])
        }else if(client.aliases.has(args[0])){
            cmddb = client.commandes.get(client.aliases.get(args[0]))
        }
        if(!cmddb) return message.reply(`${client.emotes.x} Je ne trouve pas \`${args[0].toUpperCase()}\``)

            const dir = cmddb.conf.dir
            delete require.cache[require.resolve(`../../command/${dir}/${cmddb.conf.name}`)];
            client.commandes.delete(args[0]);
            const props = require(`../../command/${dir}/${cmddb.conf.name}`);
            client.commandes.set(props.conf.name, props);

            if(props.conf.aliases) {
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.conf.name);
                });
            }
            message.react("✅")
    }
}