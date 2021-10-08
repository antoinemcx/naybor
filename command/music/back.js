module.exports={
    conf:{
        name: "back",
        description: "Allows you to play the previous song.",
        usage: '<prefix>back',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if(!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);
        if(!bot.player.getQueue(message)) return message.channel.send(bot.language.ERROR[0]);
        if(bot.player.getQueue(message).previousTracks[0] === undefined) return message.channel.send(`Previous track isn't founded`)

        await bot.player.back(message);
        await message.channel.send(bot.language.BACK)
    }
};