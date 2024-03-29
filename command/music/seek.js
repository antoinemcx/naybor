const ms = require('ms');

module.exports={
    conf:{
        name: "seek",
        description: "Allows you to jump to a timecode in the current music.",
        usage: '<prefix>seek <timeCode>',
        aliases: [],
        dir: "music",
    },
    run: async (client, message, args) => {
        if(!message.member.voice.channel) return message.reply(client.language.PLAY_ERROR[0]);
        if(message.guild.members.me.voice.channel && message.member.voice.channel.id !== message.guild.members.me.voice.channel.id) return message.reply(client.language.PLAY_ERROR[1]);
        
        const queue = client.player.nodes.get(message.guild.id);
        if(!queue || !queue.isPlaying()) return message.reply(client.language.ERROR[0]);
        
        if(!args[0]) return message.reply(client.language.WRONG_USAGE(module.exports.conf.usage))
        const time = ms(args.join(' '));
        if(time >= queue.currentTrack.durationMS) return message.reply(client.language.SEEK_ERR[1])

        try {
            await queue.node.seek(time)
            message.reply(client.language.SEEK_SUCCESS(ms(time, { long: true })))
        } catch(e) {
            message.reply(client.language.SEEK_ERR[1])
        }
    }
};