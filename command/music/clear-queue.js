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
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying()) return message.reply(client.language.ERROR[0]);
        const tracks = queue.tracks.size;

        await queue.tracks.clear();
        message.reply(client.language.CLEARQUEUE_SUCCESS(tracks));
    }
}