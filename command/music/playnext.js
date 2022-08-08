const { QueryType } = require('discord-player');

module.exports={
    conf:{
        name: "playnext",
        description: "Allows you to play a music (after the current music has stopped)",
        usage: '<prefix>playnext <name/URL>',
        aliases: ["pnext", "pn"],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        if (!args[0]) return message.reply(client.language.WRONG_USAGE(module.exports.conf.usage));

        const player = client.player;
        const queue = player.getQueue(message.guild.id);
        if(!queue || !queue.playing) return message.channel.send(client.language.ERROR[0]);

        const song = await player.search(args.join(" "), {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });
        if(!song || !song.tracks.length) return message.reply(client.language.PLAY_ERR[2])

        queue.insert(song.tracks[0]);
    }
};