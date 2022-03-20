module.exports={
    conf:{
        name: "resume",
        description: "Allows you to resume the current music if it's paused",
        usage: '<prefix>resume',
        aliases: [],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(client.language.ERROR[0]);

        const paused = queue.setPaused(false);
        message.reply(paused ? client.language.RESUME_SUCCESS : client.language.ERROR[2]);
    },
};