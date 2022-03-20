module.exports={
    conf:{
        name: "volume",
        description: "Allows you to increase or decrease the volume of the music (1-100)",
        usage: '<prefix>volume <volume>',
        aliases: [],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(client.language.ERROR[0]);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.reply(client.language.VOLUME_ERR);
        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.reply(client.language.VOLUME_ERR);

        queue.setVolume(parseInt(args[0]))
        message.reply(client.language.VOLUME_SUCCESS(parseInt(args[0])));
    },
};