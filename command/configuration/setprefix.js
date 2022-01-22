module.exports={
    conf:{
        name: 'setprefix',
        description: "Allows you to change my prefix",
        usage: '<prefix>setprefix <newPrefix>',
        aliases: [],
        dir: "configuration",
        cooldown: 3
    },
    run: async (bot, message, args) => {
        if(!message.guild.members.cache.get(message.author.id).permissions.has('MANAGE_GUILD')) return message.reply(bot.language.MISSING_PERMISSION('MANAGE_GUILD'))

        let arg = args.join(" ")
        if(!arg) return message.reply(bot.language.WRONG_USAGE(module.exports.conf.usage))
        if(arg.length > 10) return message.reply(bot.language.SETPREFIX_ERR[0])
        if(arg.includes(" ") || arg.includes('"')) return message.reply(bot.language.SETPREFIX_ERR[1])
        if(arg.includes("@here") || arg.includes("@everyone")) return message.reply(bot.language.SETPREFIX_ERR[1])

        await bot.db.query(`UPDATE guild SET prefix = "${arg}" WHERE guildID = ${message.guild.id};`)
        await message.reply(bot.language.SETPREFIX_SUCCESS(arg))
    }
}