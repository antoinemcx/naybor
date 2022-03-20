const { QueryType } = require('discord-player');

module.exports={
    conf:{
        name: "play",
        description: "Allows you to play music with YTB links, YTB playlists, Spotify links or SoundCloud links",
        usage: '<prefix>play <name/URL>',
        aliases: ["p"],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        if (!args[0]) return message.reply(client.language.WRONG_USAGE(module.exports.conf.usage));

        const player = client.player;
        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });
        const song = await player.search(args.join(" "), {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });
        if(!song || !song.tracks.length) return message.reply(client.language.PLAY_ERR[2])

        try {
            if(!queue.connection) await queue.connect(message.member.voice.channel);
        } catch (e) {
            player.deleteQueue(message.guild.id)
            message.reply(client.language.ERROR[1]);
            console.log(e)
        }

        song.playlist ? queue.addTracks(song.tracks) : queue.addTrack(song.tracks[0]);
        if(!queue.playing) await queue.play();
    }
};