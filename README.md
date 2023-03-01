# Naybor [![Stars](https://img.shields.io/github/stars/meliooff/naybor)](https://github.com/antoinemcx/naybor) [![Support Server](https://img.shields.io/discord/738122381062832180.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/G6WQsMQShZ)

Naybor is an open-source music discord bot currently available in English and French.   
If you like the project, feel free to put a ⭐ ; If you need help or anything, join the [server support](https://discord.gg/G6WQsMQShZ).

Main features : music, configurable, multilingual, cooldowns, automatic help page, easy & ready to use, ...

## Configuration

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

## Commands

### Installation

```sh
$ npm install
```

### Start the bot

```sh
$ npm run start
```

# MariaDB

Naybor runs on the MariaDB database, a slightly modified version of MySQL.<br>
First, create the database. The name of the database must be the same as the one set in the `config.js` file  
![](https://i.imgur.com/ALeKvsf.png)

To create the table, run the following command (after creating the database of course) :

```sh
$ npm run migration
```

Then, [run the bot](#start-the-bot).

# More information

FFMPEG and NodeJS (version 16 or later) are required to run the bot properly.  
If you find an error, have something to suggest, etc. make a pull request or contact me on my [discord server](https://discord.gg/G6WQsMQShZ).  
This repository is licensed under the MIT License. See the `LICENSE` file ([here](https://github.com/antoinemcx/naybor/blob/master/LICENSE)) for more information.   


###### Made with ❤️ by [meliooff](https://github.com/antoinemcx) in JavaScript.
