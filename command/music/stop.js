module.exports={
    conf:{
        name: "stop",
        description: "Allows you to stop all musics and also leave your voice channel",
        usage: '<prefix>stop',
        aliases: ['st', 'leave', 'dc', 'disconnect', 'dis'],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying()) return message.reply(client.language.ERROR[0]);

        queue.delete();
        message.reply(client.language.STOP);
    },
};