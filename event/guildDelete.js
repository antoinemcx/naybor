const { get } = require('axios');

module.exports = async (client,guild) => {
    var guilds = client.guilds.cache.size
    client.db.query(`DELETE FROM guild WHERE guildID = '${guild.id}';`)

    get(`https://discord.com/api/v6/users/${guild.ownerId}`, { headers: { Authorization: `Bot ${client.config.token}` } }).then(data => { data.json().then(owner => {
        client.guilds.cache.get('738122381062832180').channels.cache.get('829257458454495233').send({embeds: [{
                color: 0xe24646,
                thumbnail: { url: guild.iconURL({format: 'png'}) },
                author: { name: `${guild.name} - ${guild.nameAcronym}`, icon_url: guild.iconURL() },
                description: `\`${owner.username}#${owner.discriminator}\` kicked me out of his/her server with **${guild.memberCount}** members.\nI'm now on **${guilds}** servers..`,
                footer: { text: `ID : ${guild.id}` },
                timestamp: new Date(),
        }]}).catch(e=>console.log(e)) 
})})
};
