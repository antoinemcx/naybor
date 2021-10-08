const { Collection } = require("discord.js");
const { findServer } = require("../database/functions");

module.exports = async (bot, message) => {
    if (message.author.bot || message.channel.type === 'dm'){return};

    let prefix = bot.config.prefix;
    let lang = 'en';
    if(message.guild) {
        const guild = await findServer(bot, message.guild.id);
        prefix = guild !== undefined && guild.prefix !== null ? guild.prefix : bot.config.prefix;
        lang = guild !== undefined && guild.lang !== null ? guild.lang : 'en'
    };
    
    // LANGUAGE
    bot.language = require(`../language/${lang}.js`);

    // BOT MENTION
    if(message.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))){
        message.channel.send(bot.language.BOT_MENTION(prefix))
        return
    }

    if(!message.content.startsWith(prefix)){return}

    const command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
    const args = message.content.split(' ').slice(1);
    let cmd;

    if (bot.commandes.has(command)){
        cmd = bot.commandes.get(command)
    }else if(bot.aliases.has(command)){
        cmd = bot.commandes.get(bot.aliases.get(command))
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
        return message.channel.send(bot.language.BOT_COOLDOWN(timeLeft.toFixed(1), props.conf.name));
    }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    if(props.conf.private === true) { 
        if(message.author.id !== bot.config.owner) return message.channel.send(bot.language.PRIVATE_CMD)
    }
    // CHARGEMENT DE LA COMMANDE
    try {
        cmd.run(bot, message, args);
    } catch (e) {
        bot.emit("error", e, message);
    }
};