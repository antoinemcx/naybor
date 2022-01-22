module.exports={
    conf:{
        name: 'setlang',
        description: "Allows you to change my prefix",
        usage: '<prefix>setlang <en|fr>',
        aliases: ["setlanguage", "setlangage"],
        dir: "configuration",
        cooldown: 4
    },
    run: async (bot, message, args) => {
        if(!message.guild.members.cache.get(message.author.id).permissions.has('MANAGE_GUILD')) return message.reply(bot.language.MISSING_PERMISSION('MANAGE_GUILD'))

        let arg = args.join(" ")
        if(!arg) return message.reply(bot.language.WRONG_USAGE(module.exports.conf.usage))

        if(arg === "fr" || arg === "french") {
            await bot.db.query(`UPDATE guild SET lang = 'fr' WHERE guildID = ${message.guild.id}`)
            message.reply(`${bot.emotes.v} La langue est désormais **Français**`)

        } else if(arg === "en" || arg === "english") {
            await bot.db.query(`UPDATE guild SET lang = 'en' WHERE guildID = ${message.guild.id}`)
            message.reply(`${bot.emotes.v} The language is now **English**`)

        } else return message.reply(bot.language.WRONG_USAGE(module.exports.conf.usage))
    }
}