module.exports={
    conf:{
        name: "filter",
        description: "Allows you to enable or disable a specific filter. Use <prefix>filters to see the list",
        usage: '<prefix>filter <filterName>',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        if (!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);
        if (!args[0]) return message.channel.send(bot.language.FILTER_ERR[0]);

        const filterToUpdate = bot.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());
        if (!filterToUpdate) return message.channel.send(bot.language.FILTER_ERR[1]);

        const filtersUpdated = {};
        filtersUpdated[filterToUpdate] = bot.player.getQueue(message).filters[filterToUpdate] ? false : true;

        bot.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(bot.language.FILTER_SUCCESS[0]);
        else message.channel.send(bot.language.FILTER_SUCCESS[1]);
    }
};