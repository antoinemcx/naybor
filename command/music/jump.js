module.exports={
    conf:{
        name: "jump",
        description: "Allows you to jump to an other song in the queue.",
        usage: '<prefix>jump <musicPosition>',
        aliases: [],
        dir: "music",
    },
    run: async (client, message, args) => {
        if(!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if(message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);
        
        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(client.language.ERROR[0]);

        if(!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > queue.tracks.length -1) return message.reply(client.language.REMOVE_ERR[1])

        try {
            await queue.jump(parseFloat(Math.round(args[0])))
        } catch(e) {
            console.log(e)
            message.reply(client.language.ERROR[2])
        }
    }
};