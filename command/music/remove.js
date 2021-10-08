module.exports={
    conf:{
        name: "remove",
        description: "Allows you to remove a song from the queue",
        usage: '<prefix>remove <musicPosition>',
        aliases: ['remove-queue', 'queue-remove'],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);

        const queue = bot.player.getQueue(message);
        if (!queue) return message.channel.send(bot.language.ERROR[0]);
        if(queue.tracks.length < 3) return message.channel.send(bot.language.REMOVE_ERR[0])

        if(!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > queue.tracks.length -1) return message.channel.send(bot.language.REMOVE_ERR[1])

        try {
            await bot.player.remove(message, parseFloat(Math.round(args[0])))
            await message.channel.send(bot.language.REMOVE_SUCCESS(Math.round(args[0])))
        } catch(e) {
            message.channel.send(bot.language.ERROR[2])
        }
    },
};