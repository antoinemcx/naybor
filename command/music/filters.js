module.exports={
    conf:{
        name: "filters",
        description: "Allows you to see the list of the filters and their activation",
        usage: '<prefix>filters',
        aliases: ["filters-list", "filter-list", "filter-l", "filterl", "filtersl", "filters-l"],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(client.language.ERROR[0]);

        const filtersStatuses = [[], []];
        client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " **»** " + (queue.getFiltersEnabled().includes(filterName) ? client.emotes.v : client.emotes.x));
        });

        message.reply({embeds: [{
            color: client.color.messagecolor.greyple,
            author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}), url: `https://github.com/antoinemcx/naybor` },
            thumbnail: { url: message.guild.iconURL({size: 1024}) },
            description: client.language.FILTERS_DESC(client.commandes.get('filter').conf.usage),
            fields: [
                { name: '** **', value: filtersStatuses[0].join('\n'), inline: true },
                { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
            ],
            footer: { text: `${client.user.username} ©`, icon_url: client.user.avatarURL() },
            timestamp: new Date(),
        }]});
    },
};