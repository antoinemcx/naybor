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

        const queue = client.player.getQueue(message.guild.id)
        if (!queue || !queue.playing) return message.reply(client.language.ERROR[0]);

        queue.skip();
        message.reply(client.language.SKIP(queue.current));
    },
};