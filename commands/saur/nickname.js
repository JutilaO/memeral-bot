const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nickname")
        .setDescription("Random nickname")
        .addUserOption(option =>
            option
                .setName("tag")
                .setDescription("Tag an user")),
    async execute(interaction){
        try {

          var nema = interaction.user.username
          var taggedUser = interaction.options.getUser("tag")
          var groupTag = ""
          var staffTag = ""
          var AfterNameTag = ""
          var BeforeNameTag = ""
        
        
           if(taggedUser) {
              GMR1 = 33; //Amount of cases
              var n1 = Math.floor (Math.random() * (GMR1 - 1 + 1)) + 1;
              switch(n1) {     
                 case 1:  groupTag = "(AM)"; break;
                 case 2:  groupTag = "(GC)"; break;
                 case 3:  groupTag = "[ATLAS]"; break;
                 case 4:  groupTag = "{ATLAS}"; break;
                 case 5:  groupTag = "(ATLAS)"; break;
                 case 6:  groupTag = "[RIOT]"; break;
                 case 7:  groupTag = "{RIOT}"; break;
                 case 8:  groupTag = "(RIOT)"; break;
                 case 9:  groupTag = "(aC)"; break;
                 case 10: groupTag = "(FcF)"; break;
                 case 11: groupTag = "[SWAT]"; break;
                 case 12: groupTag = "{SWAT}"; break;
                 case 13: groupTag = "(SWAT)"; break;
                 case 14: groupTag = "[MS]"; break;
                 case 15: groupTag = "(MS)"; break;
                 case 16: groupTag = "[SpecF]"; break;
                 case 17: groupTag = "|SO|"; break;
                 case 18: groupTag = "(SW)"; break;
                 case 19: groupTag = "/men/"; break;
                 case 20: groupTag = "(ZG)"; break;
                 case 21: groupTag = "(ZT)"; break;
                 case 22: groupTag = "|H|"; break;
                 case 23: groupTag = "{SCO}"; break;
                 case 24: groupTag = "|RISE|"; break;
                 case 25: groupTag = "[DEA]"; break;
                 case 26: groupTag = "[NSS]"; break;
                 case 27: groupTag = "[iNs]"; break;
                 case 28: groupTag = "* UA *"; break;
                 case 29: groupTag = "(FeS)"; break;
                 case 30: groupTag = "(Takva)"; break;
                 case 31: groupTag = "$MR$"; break;
                 case 32: groupTag = "[BF]"; break;
                 case 33: groupTag = "(GIS)"; break;
              }
         
         
         
              //Staff tags
              GMR2 = 3; //Amount of cases
              var n2 = Math.floor (Math.random() * (GMR2 - 1 + 1)) + 1;
              switch(n2) {     
                 case 1:  staffTag = "(SAUR)"; break;
                 case 2:  staffTag = "{SAUR}"; break;
                 case 3:  staffTag = "(SAUR)"; break;
              }
         
              //After name group tags
              GMR3 = 5; //Amount of cases
              var n3 = Math.floor (Math.random() * (GMR3 - 1 + 1)) + 1;
              switch(n3) {     
                  case 1:  AfterNameTag = "||USB"; break;
                  case 2:  AfterNameTag = "|LM"; break;
                  case 3:  AfterNameTag = "|T"; break;
                  case 4:  AfterNameTag = ".Envy"; break;
                  case 5:  AfterNameTag = "|SOT"; break;
              }
         
         
              //Before name group tags
              GMR4 = 9; //Amount of cases
              var n4 = Math.floor (Math.random() * (GMR4 - 1 + 1)) + 1;
              switch(n4) {     
                  case 1: BeforeNameTag  = "USB||"; break;
                  case 2: BeforeNameTag = "T|"; break;
                  case 3: BeforeNameTag = "SOT|"; break;
                  case 4: BeforeNameTag = "Envy."; break;
                  case 6: BeforeNameTag = "GEN-"; break;
                  case 7: BeforeNameTag = "CPT-"; break;
                  case 8: BeforeNameTag = "SGT-"; break;
                  case 9: BeforeNameTag = "RCT-"; break;
              }
         
              //Randomizer
              GMR5 = 13
              var n5 = Math.floor (Math.random() * (GMR5 - 1 + 1)) + 1;
              switch(n5) {
                  case 1: interaction.reply(staffTag + taggedUser.username + groupTag); break; //Staff with group tag 1
                  case 2: interaction.reply(staffTag + taggedUser.username + AfterNameTag); break; //Staff with after name tag
                  case 3: interaction.reply(BeforeNameTag + taggedUser.username); break; //Non-staff 1
                  case 4: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 2
                  case 5: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 3 
                  case 6: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 4
                  case 7: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 5 
                  case 8: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 6
                  case 9: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 7
                  case 10: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 8
                  case 11: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 9
                  case 12: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 10
                  case 13: interaction.reply(groupTag + taggedUser.username); break; //Non-staff 11
              } return;
          }
         
         else
        
         
        
          
         
         
         GMR1 = 33; //Amount of cases
         var n1 = Math.floor (Math.random() * (GMR1 - 1 + 1)) + 1;
         switch(n1) {     
            case 1:  groupTag = "(AM)"; break;
            case 2:  groupTag = "(GC)"; break;
            case 3:  groupTag = "[ATLAS]"; break;
            case 4:  groupTag = "{ATLAS}"; break;
            case 5:  groupTag = "(ATLAS)"; break;
            case 6:  groupTag = "[RIOT]"; break;
            case 7:  groupTag = "{RIOT}"; break;
            case 8:  groupTag = "(RIOT)"; break;
            case 9:  groupTag = "(aC)"; break;
            case 10: groupTag = "(FcF)"; break;
            case 11: groupTag = "[SWAT]"; break;
            case 12: groupTag = "{SWAT}"; break;
            case 13: groupTag = "(SWAT)"; break;
            case 14: groupTag = "[MS]"; break;
            case 15: groupTag = "(MS)"; break;
            case 16: groupTag = "[SpecF]"; break;
            case 17: groupTag = "|SO|"; break;
            case 18: groupTag = "(SW)"; break;
            case 19: groupTag = "/men/"; break;
            case 20: groupTag = "(ZG)"; break;
            case 21: groupTag = "(ZT)"; break;
            case 22: groupTag = "|H|"; break;
            case 23: groupTag = "{SCO}"; break;
            case 24: groupTag = "|RISE|"; break;
            case 25: groupTag = "[DEA]"; break;
            case 26: groupTag = "[NSS]"; break;
            case 27: groupTag = "[iNs]"; break;
            case 28: groupTag = "* UA *"; break;
            case 29: groupTag = "(FeS)"; break;
            case 30: groupTag = "(Takva)"; break;
            case 31: groupTag = "$MR$"; break;
            case 32: groupTag = "[BF]"; break;
            case 33: groupTag = "(GIS)"; break;
         }
         
         
         
            //Staff tags
            GMR2 = 3; //Amount of cases
            var n2 = Math.floor (Math.random() * (GMR2 - 1 + 1)) + 1;
            switch(n2) {     
               case 1:  staffTag = "(SAUR)"; break;
               case 2:  staffTag = "{SAUR}"; break;
               case 3:  staffTag = "(SAUR)"; break;
            }
         
            //After name group tags
            GMR3 = 5; //Amount of cases
            var n3 = Math.floor (Math.random() * (GMR3 - 1 + 1)) + 1;
            switch(n3) {     
                case 1:  AfterNameTag = "||USB"; break;
                case 2:  AfterNameTag = "|LM"; break;
                case 3:  AfterNameTag = "|T"; break;
                case 4:  AfterNameTag = ".Envy"; break;
                case 5:  AfterNameTag = "|SOT"; break;
            }
         
         
            //Before name group tags
            GMR4 = 9; //Amount of cases
            var n4 = Math.floor (Math.random() * (GMR4 - 1 + 1)) + 1;
            switch(n4) {     
                case 1: BeforeNameTag  = "USB||"; break;
                case 2: BeforeNameTag = "T|"; break;
                case 3: BeforeNameTag = "SOT|"; break;
                case 4: BeforeNameTag = "Envy."; break;
                case 6: BeforeNameTag = "GEN-"; break;
                case 7: BeforeNameTag = "CPT-"; break;
                case 8: BeforeNameTag = "SGT-"; break;
                case 9: BeforeNameTag = "RCT-"; break;
            }
         
            //Randomizer
            GMR5 = 13
            var n5 = Math.floor (Math.random() * (GMR5 - 1 + 1)) + 1;
            switch(n5) {
               case 1: interaction.reply(staffTag + nema + groupTag); break; //Staff with group tag 1
               case 2: interaction.reply(staffTag + nema + AfterNameTag); break; //Staff with after name tag
               case 3: interaction.reply(BeforeNameTag + nema); break; //Non-staff 1
               case 4: interaction.reply(groupTag + nema); break; //Non-staff 2
               case 5: interaction.reply(groupTag + nema); break; //Non-staff 3 
               case 6: interaction.reply(groupTag + nema); break; //Non-staff 4
               case 7: interaction.reply(groupTag + nema); break; //Non-staff 5 
               case 8: interaction.reply(groupTag + nema); break; //Non-staff 6
               case 9: interaction.reply(groupTag + nema); break; //Non-staff 7
               case 10: interaction.reply(groupTag + nema); break; //Non-staff 8
               case 11: interaction.reply(groupTag + nema); break; //Non-staff 9
               case 12: interaction.reply(groupTag + nema); break; //Non-staff 10
               case 13: interaction.reply(groupTag + nema); break; //Non-staff 11
         
            }
         

    } catch(err) {
        if(err) console.log(err)
}
},
category: "saur"
}