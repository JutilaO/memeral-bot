const Discord = require("discord.js")
module.exports.run = async (bot, message) => {
return
if(message.guild.id === "" && message.channel.id === ""){
    if(message){
        var Attachment = (message.attachments).array()
        Attachment.forEach(function(attachment) {
            if(attachment.url){
                message.react("⭐")
            }
          })
          if(message.content.includes("https://")){
              images = [".png", ".jpg", ".jpeg"]
              for(i in images){
                  if(message.content.includes(images[i])){
                      message.react("⭐")
                  }
              }
          }
    }
}
}
