const lyricsFinder = require("lyrics-finder");

module.exports={
    conf:{
        name: "lyrics",
        description: "Allows you to be able to read lyrics of the current music",
        usage: '<prefix>lyrics',
        aliases: ['ly'],
        dir: "music",
        cooldow: 3
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.getQueue(message.guild.id)
        if (!queue || !queue.playing) return message.reply(client.language.ERROR[0]);

        const track = queue.nowPlaying();
        let lyrics = null;

        try {
            lyrics = await lyricsFinder(track.title, "");
            if (!lyrics) lyrics = `${client.language.LYRICS[0]} \`${track.title}\`.`;
        } catch (error) {
            lyrics = `${client.language.LYRICS[0]} \`${track.title}\`.`;
        }

        if (lyrics.length >= 2048)
        lyrics = `${lyrics.substr(0, 2045)}...`;

        return message.reply({embeds: [{
            color: client.color.messagecolor.greyple,
            author: { name: `${client.language.LYRICS[1]} ${track.title}`, icon_url: message.author.displayAvatarURL({dynamic: true}) },
            description: lyrics,
            footer: { text: `${client.user.username} ©`, icon_url: client.user.avatarURL() },
            timestamp: new Date()
        }]}).catch(console.error);
    }
};