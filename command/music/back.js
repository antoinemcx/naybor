module.exports={
    conf:{
        name: "back",
        description: "Allows you to play the previous song.",
        usage: '<prefix>back',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if(!message.member.voice.channel) return message.reply(bot.language.PLAY_ERROR[0]);
        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message.guild.id);
        if(!queue || !queue.playing) return message.reply(bot.language.ERROR[0]);
        if (!queue.previousTracks[1]) return message.reply(`Previous track isn't founded`)

        await queue.back();
        message.reply(bot.language.BACK)
    }
};