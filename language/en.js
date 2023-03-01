const { emotes } = require('../config');

module.exports = {
    BOT_MENTION: (prefix) => `Hello, in this server, my prefix is \`${prefix}\`.\nUse the \`${prefix}help\` command to get the list of my commands if you're lost.`,
    BOT_COOLDOWN: (time, cmd) => `${emotes.cooldown} You have **${time}** second(s) before you can use the \`${cmd}\` command`,
    WRONG_USAGE: (usage) => `${emotes.x} Wrong usage.\nUse \`${usage.replace('<prefix>', '')}\``,
    PRIVATE_CMD: `${emotes.x} This command is private`,
    MISSING_PERMISSION: (permission) => `${emotes.x} You do not have the necessary permissions to use this command (\`${permission}\`)`,


    // DISCORD-PLAYER MESSAGES
    TRACKSTART: (title, channel) => `${emotes.music} Playing \`${title}\` into **${channel.name}**`,
    TRACKADD: (track) => `${emotes.musiccd} \`${track.title}\` has been correctly added to the queue (**${track.duration}**)`,
    PLAYLISTADD: (playlist) => `${emotes.music} \`${playlist.title}\` added to the queue (**${playlist.tracks.length}** songs)`,
    SEARCHRESULTS: `Type the number of the music you want to listen to. Or \`cancel\` to exit.`,
    SEARCHINVALIDRESPONSE: `${emotes.v} Search successfully canceled`,
    SEARCHERROR: (length) => `${emotes.x} The number sent is not in the list.\nYou have to send a valid number between 1 and **${length}**`,
    SEARCHCANCEL: `${emotes.v} You did not indicate an answer, please resend the command`,
    NORESULTS: (query) => `${emotes.x} I didn't find any results for \`${query}\`.\nIt's possible that you have given an invalid link or that there are too many musics in a playlist (max 100)`,
    QUEUEEND: `${emotes.x} The music has stopped because there is no more music in the queue`,
    CHANNELEMPTY: `${emotes.x} The music has stopped because there is no more member in the voice channel`,
    BOTDISCONNECT: `${emotes.x} The music has stopped because i've been disconnected from the channel`,
    ERROR: [ `${emotes.x} There is no music playing`, `${emotes.x} I cannot join your voice channel, please check my permissions`,
    `${emotes.x} An error has occurred. If the error remains, please contact my support server` ],


    // SINGLE LINE COMMANDS
    PLAY_ERROR: [ `${emotes.x} You have to be in a voice channel to use this command`, `${emotes.x} You have to be in the same voice channel as me`,
    `${emotes.x} An error occurred while adding sound..` ],
    NOWPLAYING: [ `Channel`, `Duration`, "from playlist", "music", "Requested by", "Progress bar" ],
    QUEUE: [ `Queue for`, "Current song", "Requested by", "song", "in the queue" ],
    SHUFFLE: (length) => `${emotes.v} Queue correctly shuffled (**${length}** songs)`,
    SKIP: (music) => `${emotes.v} The current music \`${music}\` has just been skipped correctly`,
    STOP: `${emotes.v} Music has just been successfully stopped into this server`,
    FILTERS_DESC: (usage) => `Use the \`${usage}\` command to add a filter on the current song.`,
    INVITE: [ `Administrator permissions`, `Member permissions`, `Click here` ],
    LYRICS: [ `No lyrics found for`, `Lyrics of` ],
    BACK: `${emotes.v} The previous music is playing`,
    


    // CLEAR QUEUE COMMAND
    CLEARQUEUE_ERR: `${emotes.x} There's just one song in the queue`,
    CLEARQUEUE_SUCCESS: (tracks) => `${emotes.v} The queue has just been successfully deleted (**${tracks}** songs)`,


    // FILTER COMMAND
    FILTER_ERR: [ `${emotes.x} Please specify a valid filter to enable or disable.\nUse the \`filters\` command to see the list`,
    `${emotes.x} Please specify a valid filter, for example **8D**, **vribrato**..etc` ],
    FILTER_SUCCESS: [ `${emotes.v} I'm adding the filter to the music.\n${emotes.info} : The filter application time is relative to the music time`,
    `${emotes.v} I'm disabling the filter to the music.\n${emotes.info} : The filter application time is relative to the music time` ],


    // LOOP COMMAND
    LOOP_ERR: (message) => `${emotes.x} You must first disable the ${message === 'music' ? 'current music' : "queue"} in the loop mode`,
    LOOP_DISABLE: `${emotes.v} Loop mode correctly disabled`,
    LOOP_ENABLE: [ `${emotes.loopmode} Loop mode enabled the queue will be repeated`, `${emotes.loopmode} Loop mode enabled, current music will be repeated` ],


    // PAUSE COMMAND
    PAUSE_ERR: `${emotes.x} Current music is already paused`,
    PAUSE_SUCCESS: `${emotes.v} The current music has just been paused`,


    // RESUME COMMAND
    RESUME_ERR: `${emotes.x} Current music is already playing`,
    RESUME_SUCCESS: `${emotes.micro} The current music has just been resumed`,


    // VOLUME COMMAND
    VOLUME_ERR: `${emotes.x} Please enter a valid number between **1** and **100**`,
    VOLUME_SUCCESS: (volume) => `${emotes.volume} Volume correctly set to \`${volume}%\``,


    // HELP COMMAND
    HELP_ERR: (usage) => `${emotes.x} I could not find this command\n${emotes.info} : Usage : \`${usage}\``,
    HELP_CAT: [ "Music", "Informations" ],
    HELP: (username) => `${username}'s commands`,
    HELP_EMBED: [ `Add`, "for more infomation" ],
    HELP_CMD: [ `No aliases`, "not required", "required", "Category", "Cooldown", "seconds" ],


    // BOTINFO COMMAND
    BOTINFO_DESCRIPTION: (bot) => `**${bot}** is a discord [open-source](https://github.com/antoinemcx/naybor) music bot.
With the help of some human translators, ${bot} is available in 2 languages, at least for now : english and french.`,
    BOTINFO: [ 'Developer', 'Contributors', 'Guilds', 'servers', 'Channels', 'Statistics', 'Connected in', 'Commands', 'System', 'Platform' ],


    // SETPREFIX COMMAND
    SETPREFIX_ERR: [ `${emotes.x} The new prefix cannot exceed **10** characters`, `${emotes.x} The prefix cannot contain spaces or global mentions or even "`],
    SETPREFIX_SUCCESS: (prefix) => `${emotes.v} The new prefix is now \`${prefix}\``,


    // REMOVE COMMAND
    REMOVE_ERR: [ `${emotes.x} To remove a track from the queue, there must be at least **3** tracks in the queue`,
    `${emotes.x} Please, enter a valid position in the queue (use the \`queue\` command to search a position)` ],
    REMOVE_SUCCESS: (song) => `${emotes.v} The music number **${song}** has been corectly removed from the queue`,


    // SEEK COMMAND
    SEEK_ERR: [ `${emotes.x} Please enter a correct time (in seconds)`,
    `${emotes.x} An error has occurred, the time entered is incorrect.\nVerify that you have entered a time in seconds that is less than the duration of the music` ],
    SEEK_SUCCESS: (time) => `${emotes.v} The music was correctly advanced to ${time}` 
}