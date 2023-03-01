const { get } = require('axios');

module.exports = async (client,guild) => {
    var guilds = client.guilds.cache.size
    client.db.query(`INSERT INTO guild (guildID) VALUES (${guild.id});`)

    get(`https://discord.com/api/v6/users/${guild.ownerId}`, { headers: { Authorization: `Bot ${client.config.token}` } }).then(data => { data.json().then(owner => {
        client.guilds.cache.get(client.config.serverID).channels.cache.get(client.config.logChannel).send({embeds: [{
            color: client.color.messagecolor.green,
            thumbnail: { url: guild.iconURL({format: 'png', size: 1024}) },
            author: { name: `${guild.name} - ${guild.nameAcronym}`, icon_url: guild.iconURL(), url: `https://github.com/antoinemcx/naybor` },
            description: `\`${owner.username}#${owner.discriminator}\` added me to his/her server with **${guild.memberCount}** members, we thank him/her !\nI'm now on **${guilds}** servers..`,
            footer: { text: `ID : ${guild.id}` },
            timestamp: new Date(),
        }]}).catch(e => { console.log(e); console.log('+1'); })
    })}).catch(e => { console.log(e); console.log('+1'); })
};