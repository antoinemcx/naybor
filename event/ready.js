module.exports = async (bot) => {
    console.log(`Ready on ${bot.guilds.cache.size} servers, for a total of ${bot.users.cache.size} users`);

    bot.user.setActivity(`${bot.config.prefix}help`);
};