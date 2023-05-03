module.exports={
    conf:{
        name: "skipto",
        description: "Allows you to skip to another song of the queue",
        usage: '<prefix>skipto <musicPosition>',
        aliases: [],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id);
        if (!queue || !queue.isPlaying()) return message.reply(client.language.ERROR[0]);
        if(queue.tracks.size < 3) return message.reply(client.language.SKIPTO_ERR[0])

        if(!args[0] || isNaN(args[0]) || args[0] < 1 || args[0] > queue.tracks.size -1) return message.reply(client.language.SKIPTO_ERR[1])

        try {
            await queue.node.skipTo(parseFloat(Math.round(args[0]))-1)
            await message.channel.send(client.language.SKIPTO_SUCCESS(Math.round(args[0])))
        } catch(e) {
            message.channel.send(client.language.ERROR[2])
        }
    },
};