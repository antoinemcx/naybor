module.exports={
    conf:{
        name: "back",
        description: "Allows you to play the previous song.",
        usage: '<prefix>back',
        aliases: [],
        dir: "music",
    },
    run: async (client, message, args) => {
        if(!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if(message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id);
        if(!queue || !queue.node.isPlaying()) return message.reply(client.language.ERROR[0]);
        if (!queue.history.previousTrack) return message.reply(`Previous track isn't founded`)

        await queue.history.previous();
        message.reply(client.language.BACK)
    }
};