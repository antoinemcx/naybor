module.exports={
    conf:{
        name: "pause",
        description: "Allows you to pause the music, next you can resume it with another command",
        usage: '<prefix>pause',
        aliases: [],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying()) return message.reply(client.language.ERROR[0]);

        const paused = queue.node.setPaused(true);
        message.reply(paused ? client.language.PAUSE_SUCCESS : client.language.ERROR[2]);
    }
};