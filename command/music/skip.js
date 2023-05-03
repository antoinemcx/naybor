module.exports={
    conf:{
        name: "skip",
        description: "Allows you to skip the music and therefore to play the next one",
        usage: '<prefix>skip',
        aliases: ["sk", 's', 'fs'],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id)
        if (!queue || !queue.node.isPlaying()) return message.reply(client.language.ERROR[0]);

        queue.node.skip();
        message.reply(client.language.SKIP(queue.currentTrack));
    },
};