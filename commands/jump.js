const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");

module.exports = {
  name: "jump",
  execute (client, message, args) {
    
     let embed = new MessageEmbed()
.setColor(COLOR);

    const { channel } = message.member.voice;
    if (!channel) {
      embed.setAuthor("Você precisa estar em um canal de voz!")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Não há nada tocando que eu pudesse repetir")
      return message.channel.send(embed);
    }
     if(!args[0]) {
      embed.setAuthor(`Informe o número da música!`)
      return message.channel.send(embed)
    }
    
      if(isNaN(args[0])) {
      embed.setAuthor("Informe um valor numérico!")
      return message.channel.send(embed)
    }
  if(serverQueue.songs.length < args[0]) {
    embed.setAuthor("Incapaz de encontrar esta música na fila!")
    return message.channel.send(embed)  
                                         }
    serverQueue.songs.splice(0, Math.floor(parseInt(args[0]) - 1))
    serverQueue.connection.dispatcher.end()
    
    embed.setDescription(`Música pulada para a: - ${args[0]}`)
    message.channel.send(embed)
    
  }
}
