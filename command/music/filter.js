module.exports={
    conf:{
        name: "filter",
        description: "Allows you to enable or disable a specific filter. Use <prefix>filters to see the list",
        usage: '<prefix>filter <filterName>',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);
        if (!args[0]) return message.reply(bot.language.FILTER_ERR[0]);

        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());
        if (!filter) return message.reply(bot.language.FILTER_ERR[1]);

        const filtersUpdated = {};
        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);
        message.reply(queue.getFiltersEnabled().includes(filter) ? bot.language.FILTER_SUCCESS[0] : bot.language.FILTER_SUCCESS[1])
    }
};