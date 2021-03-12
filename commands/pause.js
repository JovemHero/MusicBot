const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../config.json");

module.exports = {
  name: "pause",
  aliases: ['ps'],
  execute (client, message, args) {
  const { channel } = message.member.voice;
   let embed = new MessageEmbed()
.setColor(COLOR);

    
    if (!channel) {
      embed.setAuthor("Você precisa estar em um canal de voz!")
      return message.channel.send(embed);
    }
    
    
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Não tem nenhuma música tocando para pausar!")
      return message.channel.send(embed);
    }
    
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      
      embed.setDescription("✅ | Música pausada!")
      embed.setThumbnail(client.user.displayAvatarURL())
      return message.channel.send(embed)
  }  
  }
}
