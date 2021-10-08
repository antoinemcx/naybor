module.exports={
    conf:{
        name: "jump",
        description: "Allows you to jump to an other song in the queue.",
        usage: '<prefix>jump <musicPosition>',
        aliases: [],
        dir: "music",
    },
    run: async (bot, message, args) => {
        if(!message.member.voice.channel) return message.channel.send(bot.language.PLAY_ERROR[0]);
        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(bot.language.PLAY_ERROR[1]);
        
        const queue = bot.player.getQueue(message);
        if (!queue) return message.channel.send(bot.language.ERROR[0]);

        if(!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > queue.tracks.length -1) return message.channel.send(bot.language.REMOVE_ERR[1])

        try {
            await bot.player.jump(message, parseFloat(Math.round(args[0])))
        } catch(e) {
            message.channel.send(bot.language.ERROR[2])
        }
    }
};