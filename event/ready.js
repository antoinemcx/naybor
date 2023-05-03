module.exports = async (client) => {
    console.log('\x1b[37m%s\x1b[0m', `(!) Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    client.user.setActivity(`${client.config.prefix}help`);
};