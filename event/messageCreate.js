const { Collection } = require("discord.js");
const { findServer } = require("../database/functions");

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'dm'){return};

    let prefix = client.config.prefix;
    let lang = 'en';
    if(message.guild) {
        const guild = await findServer(client, message.guild.id);
        prefix = guild !== undefined && guild.prefix !== null ? guild.prefix : client.config.prefix;
        lang = guild !== undefined && guild.lang !== null ? guild.lang : 'en'
    };
    
    // LANGUAGE
    client.language = require(`../language/${lang}.js`);

    // BOT MENTION
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
        message.reply(client.language.BOT_MENTION(prefix))
        return
    }

    if(!message.content.startsWith(prefix)){return}

    const command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
    const args = message.content.split(' ').slice(1);
    let cmd;

    if (client.commandes.has(command)){
        cmd = client.commandes.get(command)
    }else if(client.aliases.has(command)){
        cmd = client.commandes.get(client.aliases.get(command))
    }
    if(!cmd) return;
    
    const props = require(`../command/${cmd.conf.dir}/${cmd.conf.name}`);
    

    // COOLDOWNS & ERREUR
    if (!cooldowns.has(props.conf.name)) {
        cooldowns.set(props.conf.name, new Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(props.conf.name);
    const cooldownAmount = (props.conf.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(client.language.BOT_COOLDOWN(timeLeft.toFixed(1), props.conf.name));
    }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    if(props.conf.private === true) { 
        if(message.author.id !== client.config.owner) return message.reply(client.language.PRIVATE_CMD)
    }
    // COMMAND LOADING
    try {
        cmd.run(client, message, args);
    } catch (e) {
        client.emit("error", e, message);
    }
};