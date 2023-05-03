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
        const queue = player.nodes.get(message.guild.id);
        if(!queue || !queue.node.isPlaying()) return message.channel.send(client.language.ERROR[0]);

        const searchResult = await player.search(args.join(" "), {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });
        if(!searchResult || !searchResult.hasTracks()) return message.reply(client.language.PLAY_ERR[2])

        await queue.insertTrack(searchResult.tracks[0]);
        await message.reply(client.language.PLAYNEXT(searchResult.tracks[0]));
    }
};