# Naybor [![Stars](https://img.shields.io/github/stars/meliooff/naybor)](https://github.com/meliooff/naybor) [![Support Server](https://img.shields.io/discord/738122381062832180.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/G6WQsMQShZ)

Naybor is an open-source music discord bot currently available in English and French.   
If you like the project, feel free to put a ⭐ ; If you need help or anything, join the [server support](https://discord.gg/G6WQsMQShZ).   
   
Main features : music, configurable, multilingual, cooldowns, automatic help page, easy & ready to use, ...

# Configuration

For the configuration, rename the `config-example.js` file to `config.js` and replace the :
```js
module.exports = {
    token: '',
    prefix: '',
    owner: "",
    db: {
        host: "",
        user: "",
        password: "",
        database: "",
    },
    serverID: "",
    logChannel: "",
    
    emotes: {},
};
```

# Commands

**Installation**
> `npm install`

**Start the bot**  
> `node naybor.js`

# MariaDB

Naybor runs on the MariaDB database, a slightly modified version of MySQL.  
Here is the "**guild**" table to create to ensure the proper functioning of the bot :  
  
[![guild table](https://i.imgur.com/4D971G4.png)](https://discord.gg/G6WQsMQShZ)

# More information

FFMPEG and NodeJS (version 16 or later) are required to run the bot properly.  
If you find an error, have something to suggest, etc. make a pull request or contact me on my [discord server](https://discord.gg/G6WQsMQShZ).  
This repository is licensed under the MIT License. See the `LICENSE` file ([here](https://github.com/meliooff/naybor/blob/master/LICENSE)) for more information.   


###### Made with ❤️ by [meliooff](https://github.com/meliooff) in JavaScript.
