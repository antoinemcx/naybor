module.exports={
    conf:{
        name: "filters",
        description: "Allows you to see the list of the filters and their activation",
        usage: '<prefix>filters',
        aliases: ["filters-list", "filter-list", "filter-l", "filterl", "filtersl", "filters-l"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);

        const filtersStatuses = [[], []];
        bot.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " **»** " + (queue.getFiltersEnabled().includes(filterName) ? bot.emotes.v : bot.emotes.x));
        });

        message.reply({embeds: [{
            color: bot.color.messagecolor.greyple,
            author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
            thumbnail: { url: message.guild.iconURL({size: 1024}) },
            description: bot.language.FILTERS_DESC(bot.commandes.get('filter').conf.usage),
            fields: [
                { name: '** **', value: filtersStatuses[0].join('\n'), inline: true },
                { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
            ],
            footer: { text: `${bot.user.username} ©`, icon_url: bot.user.avatarURL() },
            timestamp: new Date(),
        }]});
    },
};