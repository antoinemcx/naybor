const { QueueRepeatMode } = require('discord-player');

module.exports={
    conf:{
        name: "loop",
        description: "Allows you to loop the current music or the queue",
        usage: '<prefix>loop [queue]',
        aliases: ['repeat', 'lp', 'boucle'],
        dir: "music",
    },
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if (message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);

        const queue = client.player.nodes.get(message.guild.id);
        if (!queue || !queue.node.isPlaying()) return message.reply(client.language.ERROR[0]);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.reply(client.language.LOOP_ERR('queue'))

            queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
            return message.reply(queue.repeatMode === 0 ? client.language.LOOP_DISABLE : client.language.LOOP_ENABLE[0]);

        } else {
            if (queue.repeatMode === 2) return message.reply(client.language.LOOP_ERR('queue'))

            queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
            return message.reply(queue.repeatMode === 0 ? client.language.LOOP_DISABLE : client.language.LOOP_ENABLE[1])
        };
    },
};