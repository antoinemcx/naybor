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
        const player = client.player;
        const channel = message.member.voice.channel;

        if (!channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        if (!args[0]) return message.reply(client.language.WRONG_USAGE(module.exports.conf.usage));

        const searchResult = await player.search(args.join(" "), { requestedBy: message.author, searchEngine: QueryType.AUTO });
        if (!searchResult.hasTracks()) { return message.reply(client.language.PLAY_ERR[2]) };
        
        try {
            if(searchResult.playlist) {
                await message.reply({ content: client.language.PLAYLISTADD(searchResult.playlist) })
            } else {
                await message.reply({ content: client.language.TRACKADD(searchResult.tracks[0]) })
            }

            await player.play(channel, searchResult, {
                nodeOptions: {
                    metadata: {
                        channel: message.channel,
                        client: message.guild?.members.me,
                        requestedBy: message.author.username
                    },
                    leaveOnEnd: true,
                    leaveOnEndCooldown: 50000,
                    volume: 90
                }
            });
        } catch (e) {
            return message.channel.send(client.language.ERROR[1]);
        }
    }
};