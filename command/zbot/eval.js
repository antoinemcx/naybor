const util = require("util");

module.exports = {
    conf: {
        name: "eval",
        description: "Permet d'évaluer un code JavaScript",
        usage: "<prefix>eval <eval>",
        aliases: ["e"],
        dir: "zbot",
        private: true,
        cooldown: 3
    },
    run: (bot, message, args) => {
        try {
            let ev = eval(args.join(' '))

            let str = util.inspect(ev, {
                depth: 1
            })

            str = `${str.replace(new RegExp(`${bot.token}`, "g"), "nop?")}`;
            if(str.length > 1900) {
                str = str.substr(0, 1900)
                str = str + "..."
            }
            
            message.react("✅");
            message.channel.send('**:ballot_box_with_check: Eval réussi:**\n'+ '\`\`\`JS\n' + str + '\`\`\`');}
        catch (err) {
            message.react("❌");
            message.channel.send('**:x: Eval fail:**\n'+'\`\`\`JS\n' + err + '\`\`\`');
        }
    }
}