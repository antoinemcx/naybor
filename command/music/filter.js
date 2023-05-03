module.exports={
    conf:{
        name: "filter",
        description: "Allows you to enable or disable a specific filter. Use <prefix>filters to see the list",
        usage: '<prefix>filter <filterName>',
        aliases: [],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying()) return message.reply(client.language.ERROR[0]);
        if (!args[0]) return message.reply(client.language.FILTER_ERR[0]);

        const filter = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());
        if (!filter) return message.reply(client.language.FILTER_ERR[1]);

        queue.filters.ffmpeg.toggle(args[0]);
        message.reply(queue.filters.ffmpeg.isEnabled(filter) ? client.language.FILTER_SUCCESS[0] : client.language.FILTER_SUCCESS[1])
    }
};