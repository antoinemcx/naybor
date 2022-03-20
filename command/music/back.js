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
        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.getQueue(message.guild.id);
        if(!queue || !queue.playing) return message.reply(client.language.ERROR[0]);
        if (!queue.previousTracks[1]) return message.reply(`Previous track isn't founded`)

        await queue.back();
        message.reply(client.language.BACK)
    }
};