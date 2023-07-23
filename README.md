<h1 align="center">Naybor 🎶</h1>
<p align="center">
    Open-source music discord bot by <a href="https://github.com/antoinemcx">Melio</a> currently available in English and French.<br />
    If you like the project, feel free to put a ⭐ for better referencing ; If you need help, join the <a href="https://discord.gg/G6WQsMQShZ">support server</a>.
</p>

<p align="center">
    <a title="MIT Lisence" href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
    <a title="CodeFactor" href="https://www.codefactor.io/repository/github/antoinemcx/naybor">
        <img src="https://www.codefactor.io/repository/github/antoinemcx/naybor/badge" alt="CodeFactor">
    </a>
    <a title="Version discord.js" href="https://www.npmjs.com/package/discord.js">
        <img src="https://img.shields.io/badge/discord.js-v14.1.2-blue.svg?logo=npm" alt="Version discord.js">
    </a>
    <a title="Stars" href="https://github.com/antoinemcx/naybor">
        <img src="https://img.shields.io/github/stars/antoinemcx/naybor" alt="Stars">
    </a>
    <a title="Support server" href="https://discord.gg/G6WQsMQShZ">
        <img src="https://img.shields.io/discord/738122381062832180.svg?&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2&label=Support" alt="Support server">
    </a>

   <br>
</p>

## Features
* 🎶 Music playing
* 🌐 French and English translation
* ⚙️ Prefix and language configuration
* 🕑 Command handler with cooldowns
* 🤖 Automatic help page
* 💭 Clean help and botinfo commands

<br>

## Setup the bot

### Configuration
For the configuration, rename the `config-example.js` file to `config.js` and replace the following values :
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

### Installation
```sh
$ npm install
```

### MariaDB

Naybor runs on the MariaDB database, a slightly modified version of MySQL.<br>
First, create the database. The name of the database must be the same as the one set in the `config.js` file  

![](https://i.imgur.com/ALeKvsf.png)

#### After creating the database, run the following command :
```sh
$ npm run migration
```

### Start the bot
```sh
$ npm start
```

<br>

# More information

**FFMPEG** and **NodeJS** (version 16.9.0 or later) are required to run the bot properly.  
If you find an error, have something to suggest, etc. make a pull request or contact me on my [discord server](https://discord.gg/G6WQsMQShZ).  
This repository is licensed under the MIT License. See the `LICENSE` file ([here](LICENSE)) for more information.