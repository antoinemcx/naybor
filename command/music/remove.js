module.exports={
    conf:{
        name: "remove",
        description: "Allows you to remove a song from the queue",
        usage: '<prefix>remove <musicPosition>',
        aliases: ['remove-queue', 'queue-remove'],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.reply(client.language.ERROR[0]);
        if(queue.tracks.length < 3) return message.reply(client.language.REMOVE_ERR[0])

        if(!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > queue.tracks.length -1) return message.reply(client.language.REMOVE_ERR[1])

        try {
            await queue.remove(parseFloat(Math.round(args[0])))
            await message.channel.send(client.language.REMOVE_SUCCESS(Math.round(args[0])))
        } catch(e) {
            message.channel.send(client.language.ERROR[2])
        }
    },
};