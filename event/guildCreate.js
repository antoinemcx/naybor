const fetch = require('node-fetch');

module.exports = async (bot,guild) => {
    var guilds = bot.guilds.cache.size
    bot.db.query(`INSERT INTO guild (guildID) VALUES (${guild.id});`)

    fetch(`https://discord.com/api/v6/users/${guild.ownerID}`, { headers: { Authorization: `Bot ${bot.config.token}` } }).then(data => { data.json().then(owner => {
        bot.guilds.cache.get('738122381062832180').channels.cache.get('829257458454495233').send({embed: {
            color: bot.color.messagecolor.green,
            thumbnail: { url: guild.iconURL({format: 'png', size: 1024}) },
            author: { name: `${guild.name} - ${guild.nameAcronym}`, icon_url: guild.iconURL() },
            description: `\`${owner.username}#${owner.discriminator}\` added me to his/her server with **${guild.memberCount}** members, we thank him/her !\nI'm now on **${guilds}** servers..`,
            footer: { text: `ID : ${guild.id}` },
            timestamp: new Date(),
        }}).catch(e=>console.log(e))
    })})
};