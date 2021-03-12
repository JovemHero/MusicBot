const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
client.queue = new Map();
client.vote = new Map();

    client.on("ready", () => {
    client.commands = new Discord.Collection();

    const cmds = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));
    for(const file of cmds){
    const cmd = require(`./commands/${file}`);

    client.commands.set(cmd.name, cmd);
}

    client.on('message', async message => {
    if(message.author.bot || !message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const cmd = client.commands.get(cmdName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if(!cmd) return message.reply(`\`${cmdName}\`  esse comando não existe!`);

    try{
        cmd.execute(client, message, args);
    }catch(err){
        message.reply(`Comando com erro, por favor, vizualize o console`);
        console.log(err);
    }

});

client.on('ready', () => {
    cmds.forEach(cmd => {
        console.log(`${cmd} carregado.`)
    })

    console.log(`${client.user.tag} carregado com sucesso!`)
})

client.login(config.token)
