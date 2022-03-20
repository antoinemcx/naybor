module.exports={
    conf:{
        name: "clear-queue",
        description: "Allows you to clear the current queue",
        usage: '<prefix>clear-queue',
        aliases: ["c-q", "clearq"],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(client.language.ERROR[0]);
        const tracks = queue.tracks.length;
        if (!queue.tracks[0]) return message.reply(client.language.CLEARQUEUE_ERR);

        await queue.clear();
        message.reply(client.language.CLEARQUEUE_SUCCESS(tracks));
    }
}