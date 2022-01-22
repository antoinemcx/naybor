const { QueryType } = require('discord-player');

module.exports={
    conf:{
        name: "search",
        description: "Allows you to search a song by it title (so to be able to choose your song)",
        usage: '<prefix>search <songTitle>',
        aliases: ["sr"],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        if (!args[0]) return message.reply(bot.language.WRONG_USAGE(module.exports.conf.usage));

        // bot.player.play(message, args.join(" "));
        const player = bot.player;
        const song = await player.search(args.join(" "), {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });
        if(!song || !song.tracks.length) return message.reply(bot.language.PLAY_ERR[2])
        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        message.reply({embeds: [{
            color: bot.color.messagecolor.greyple,
            author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
            description: `${song.tracks.slice(0, 10).map((t, i) => `\`${i + 1}.\` [${t.title}](${t.url})`).join('\n')}\n\n${bot.language.SEARCHRESULTS}`,
            footer: { text: `${bot.user.username} ©`, icon_url: bot.user.avatarURL() },
            timestamp: new Date(),
        }]})

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });
        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(bot.language.SEARCHINVALIDRESPONSE) && collector.stop();

            const value = parseInt(query.content);
            if (!value || value <= 0 || value > song.tracks.slice(0, 10).length) return message.channel.send(bot.language.SEARCHERROR(tracks.length));
            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(bot.language.ERRROR[1]);
            }

            // await message.channel.send(`Loading your search... 🎧`);
            queue.addTrack(song.tracks[query.content - 1]);
            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(bot.language.SEARCHCANCEL);
        });
    },
};