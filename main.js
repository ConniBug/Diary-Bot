function messageGuildOwner(guild, message) {
    guild.members.cache.find(c => c.id == guild.owner.user.id).send(message);
}

var ownersDiscordTag = "Conni!~#0920";
var versionNum = "V0.0.1.8b";

const Discord = require("discord.js");

const config = require("./config.json");

const client = new Discord.Client({ fetchAllMembers: false })

//
// DISCORD JS
//

client.on("ready", async () => {
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);

    client.api.applications(client.user.id).guilds("689925894764232788").commands.post({
        data: {
            name: "hello",
            description: "hello world command"
            // possible options here e.g. options: [{...}]
        },
        data: {
            name: "restart",
            description: "Restart the bot."
        }
    });


    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if (command === 'hello'){
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "hello world!!!"
                    }
                }
            })
        }
        console.log(interaction);
    });
});

client.on("guildCreate", async guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`${client.guilds.cache.size} Servers!`);
});

var prefix = config.prefix; 
var diaryChannelName = "diaries";
var diaryChannelName_Archived = "diaries_a";
let verifiedRole;
let group1RoleID;
let group2RoleID;
let group3RoleID;
let group4RoleID;
let group5RoleID;
var diaryTopicNameStartsWith = "diary-";
var staffRoleID = "716273854594678844";

function diaryOwnershipCheck(channel, user) {
    if (channel.topic !== `${diaryTopicNameStartsWith}${user.id}`) {
        if(user.id === "299709641271672832") {
           // channel.send("Admin bypassed this channels permission system.");
            return true;
        }
        return false;
    }
    return true;
}

function diaryOwnershipCheck_OLD(channel, user) {
    if (channel.topic !== user.id) {
        if(user.id === "299709641271672832") {
            channel.send("Admin bypassed this channels permission system.");
            return true;
        }
        return false;
    }
    return true;
}


function setSetCantType(message) {
    var name = message.channel.parent.name.toLowerCase();
    //  console.log(name);
          if(name === "diarys group 1") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { SEND_MESSAGES: false  }), 500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { SEND_MESSAGES: false }), 1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { SEND_MESSAGES: false }), 1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { SEND_MESSAGES: false }), 2000);
           //   setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 2500);
          }
          if(name === "diarys group 2") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { SEND_MESSAGES: false }),  500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { SEND_MESSAGES: false  }),1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { SEND_MESSAGES: false }), 1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { SEND_MESSAGES: false }), 2000);
             //setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 4200);
          }
          if(name === "diarys group 3") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { SEND_MESSAGES: false }),  500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { SEND_MESSAGES: false }), 1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { SEND_MESSAGES: false  }),1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { SEND_MESSAGES: false }), 2000);
              //setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 4200);
          }
          if(name === "diarys group 4") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { SEND_MESSAGES: false }),  500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { SEND_MESSAGES: false }), 1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { SEND_MESSAGES: false }), 1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { SEND_MESSAGES: false  }),2000);
            //  setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 4200);
          }
          if(name === "diarys group 5") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { SEND_MESSAGES: false }),  500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { SEND_MESSAGES: false }), 1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { SEND_MESSAGES: false }), 1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { SEND_MESSAGES: false }), 2000);
            //  setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: true  }), 200);
          }
}

function setCanSend(message) {
    console.log("DOING IT");
    console.log(group1RoleID);
    setSetCantType(message);
    var name = message.channel.parent.name.toLowerCase();
    //  console.log(name);
          if(name === "diarys group 1") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { SEND_MESSAGES: true  }), 2500);
          }
          if(name === "diarys group 2") {
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { SEND_MESSAGES: true  }), 2500);
          }
          if(name === "diarys group 3") {
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { SEND_MESSAGES: true  }), 2500);
          }
          if(name === "diarys group 4") {
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { SEND_MESSAGES: true  }), 2500);
          }
          if(name === "diarys group 5") {
            //  setTimeout(() => message.channel.updateOverwrite(group5RoleID, { SEND_MESSAGES: true  }),2500);
          }
}

function setPrivate(message) {
    var name = message.channel.parent.name.toLowerCase();
    //  console.log(name);
          if(name === "diarys group 1") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: false  }), 500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: false }), 1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: false }), 1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: false }), 2000);
           //   setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 2500);
          }
          if(name === "diarys group 2") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: false }),  500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: false  }),1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: false }), 1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: false }), 2000);
             //setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 4200);
          }
          if(name === "diarys group 3") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: false }),  500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: false }), 1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: false  }),1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: false }), 2000);
              //setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 4200);
          }
          if(name === "diarys group 4") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: false }),  500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: false }), 1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: false }), 1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: false  }),2000);
            //  setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 4200);
          }
          if(name === "diarys group 5") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: false }),  500);
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: false }), 1000);
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: false }), 1500);
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: false }), 2000);
            //  setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: true  }), 200);
          }
}

function setPublic(message) {
    console.log("DOING IT");
    console.log(group1RoleID);
    setPrivate(message);
    var name = message.channel.parent.name.toLowerCase();
    //  console.log(name);
          if(name === "diarys group 1") {
              setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: true  }), 2500);
          }
          if(name === "diarys group 2") {
              setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: true  }), 2500);
          }
          if(name === "diarys group 3") {
              setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: true  }), 2500);
          }
          if(name === "diarys group 4") {
              setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: true  }), 2500);
          }
          if(name === "diarys group 5") {
            //  setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: true  }),2500);
          }
}

client.on("message", async message => {
    if (message.author.bot) return;

    //if(message.guild.id != "720692652986597447") return;
    verifiedRole = message.guild.roles.cache.find(c => c.name == "Verified");

    group1RoleID = message.guild.roles.cache.find(c => c.name == "diary group 1").id;
   // console.log(group1RoleID);
    group2RoleID = message.guild.roles.cache.find(c => c.name == "diary group 2").id;
    group3RoleID = message.guild.roles.cache.find(c => c.name == "diary group 3").id;
    group4RoleID = message.guild.roles.cache.find(c => c.name == "diary group 4").id;
    //let group5Role = message.guild.roles.cache.find(c => c.name == "diary group 5").id;
    // if(verifiedRole == undefined) {
    //     console.log("role is undefined");
    //     let chan = message.guild.channels.cache.find(c => c.name == "diary-roleid");
    //     verifiedRole = message.guild.roles.cache.find(c => c.id == chan.topic);
    //     console.log(verifiedRole.name);
    // }
   // console.log(verifiedRole.name);

    //client.user.setActivity(`${client.guilds.cache.size} Servers!`);
    client.user.setActivity(`Trans Right!`);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    ISME = message.mentions.members.first() || message.guild.members.resolveID(args[0]);
    if (ISME && ISME.id === "783022873685393428") {
        message.channel.send(`HELLO, my prefix is ${prefix}`)
            .then(msg => {
                msg.delete({ timeout: 3000 })
            })
            .catch(console.error);
    }

    if (!message.content.startsWith(prefix)) return;

    if (command === 'delete') {
        if (args[0] === "my") {
            if (args[1] === "data") {
                message.author.send(`If you would like your data removed from our servers please contactthe bot owner/lead dev via there discord- ${ownersDiscordTag}!`);
            }
        }
    }

    if (command === "create") {
        message.delete().catch(O_o => { });

        if (message.guild.me.hasPermission("MANAGE_CHANNELS")) {
            message.guild.channels.create(`diary-${message.author.username}`)
                .then(channel => {
                    var willStop = false;

                    let category = message.guild.channels.cache.find(c => c.name == diaryChannelName && c.type == "category");

                    if (!category) {
                        message.channel.send("No catagory configed placed room randomly!")
                            .then(msg => {
                                msg.delete({ timeout: 3000 })
                            })
                            .catch(console.error);
                        willStop = true;
                    }

                    if (willStop) return;

                    channel.setParent(category);

                    channel.send(". }")
                        .then(msg => {
                            msg.delete({ timeout: 200 })
                            channel.updateOverwrite(verifiedRole.id, { VIEW_CHANNEL: false });
                        })
                        .catch(console.error);

                    channel.send(". }")
                        .then(msg => {
                            msg.delete({ timeout: 400 })
                            channel.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });
                        })
                        .catch(console.error);

                    channel.send(". }")
                        .then(msg => {
                            msg.delete({ timeout: 600 })
                            channel.updateOverwrite(verifiedRole.id, { SEND_MESSAGES: false });
                        })
                        .catch(console.error);       

                    channel.send(".")
                        .then(msg => {
                            msg.delete({ timeout: 500 })
                            channel.updateOverwrite(message.author.id, { SEND_MESSAGES: true });
                        })
                        .catch(console.error);       


                    message.channel.send(`Heres your diary <@${message.author.id}>! - <#${channel.id}>`)
                        .then(msg => {
                            msg.delete({ timeout: 3000 })
                        })
                        .catch(console.error);

                    channel.setTopic(`diary-${message.author.id}`);
                });
        }
        else {
            message.channel.send("Missing perms to create/manage channels!")
                .then(msg => {
                    msg.delete({ timeout: 5000 })
                })
                .catch(console.error);
        }
    }

    if (command === 'restart') {
        if (message.author.id !== '299709641271672832') {
            return;
        }

        message.channel.send('Restarting.').then(() => {
            process.exit(1);
        })
    }     
    else if (command === "info") {
        message.channel.send(`${ownersDiscordTag} - Version: ${versionNum}`);
    }
    else if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed();
        helpEmbed
            .setColor(16726994)
            .setFooter('Conni!~#0920', `https://i.imgur.com/91GaUEd.png`)
            .setTitle('Diary-Bot - Commands')
            .addFields(
                { name: 'info', value: 'show user info', inline: false },
                { name: 'create', value: 'Will create a new diary channel that only you have access to', inline: false },
                { name: 'public', value: 'Everyone can see the channel', inline: false },
                { name: 'private', value: 'Only you can see the channel', inline: false },
                { name: 'nostaff', value: 'means non admin staff can not see the channel', inline: false },
                { name: 'yesstaff', value: 'means non admin staff can see but not the public', inline: false },
                { name: 'archive', value: 'archives the diary so only you and high ranking staff can see it (staff can unarchive them for you)', inline: false },
                { name: 'close', value: 'archives the diary so only high ranking staff can see it, again high ranking staff can undo this if need be (this is so if someone breaks discord ToS or our rules we have proof) if youd like staff can perm delete it for you', inline: false }
        );
        message.channel.send(helpEmbed);

    }

    if(message.channel.topic == null) {
        console.log("Shits null?");
        return;
    }
    if (!message.channel.topic.startsWith(diaryTopicNameStartsWith)) {
        return;
    }
    if(!diaryOwnershipCheck(message.channel, message.author)) {
        message.reply("You do not own this diary!");
        return;
    } 

    var name = message.channel.parent.name.toLowerCase();
  //  console.log(name);
    if(command === "group") {
        if(name === "diarys group 1") {
            setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: true  }), 200);
            setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: false }), 1200);
            setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: false }), 3200);
            setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: false }), 4200);
            setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 5200);
        }
        if(name === "diarys group 2") {
            setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: false }), 1200);
            setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: true  }), 200);
            setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: false }), 2200);
            setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: false }), 3200);
           //setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 4200);
        }
        if(name === "diarys group 3") {
            setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: false }), 2200);
            setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: false }), 1200);
            setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: true  }), 200);
            setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: false }), 3200);
            //setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 4200);
        }
        if(name === "diarys group 4") {
            setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: false }), 3200);
            setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: false }), 1200);
            setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: false }), 2200);
            setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: true  }), 200);
          //  setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: false }), 4200);
        }
        if(name === "diarys group 5") {
            setTimeout(() => message.channel.updateOverwrite(group1RoleID, { VIEW_CHANNEL: false }), 4200);
            setTimeout(() => message.channel.updateOverwrite(group2RoleID, { VIEW_CHANNEL: false }), 1200);
            setTimeout(() => message.channel.updateOverwrite(group3RoleID, { VIEW_CHANNEL: false }), 2200);
            setTimeout(() => message.channel.updateOverwrite(group4RoleID, { VIEW_CHANNEL: false }), 3200);
          //  setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: true  }), 200);
        }
        message.channel.send(`You are ${name}`);
        message.delete();
    }
    
    if(command === "global") {
        if(args[0] === "view") {
            if(args[1] === "allow") {
                setTimeout(() => message.channel.updateOverwrite(verifiedRole.id, { VIEW_CHANNEL: false }), 100);
                setPublic(message);
                message.reply(" Everyone can see your diary now!");
            } else if(args[1] === "deny") {
                setTimeout(() => message.channel.updateOverwrite(verifiedRole.id, { VIEW_CHANNEL: false }), 100);
                setPrivate(message);
                message.reply(" Noone can see your diary now!");
            }
        } 
        else if(args[0] === "send") {
            if(args[1] === "allow") {
                setTimeout(() => message.channel.updateOverwrite(verifiedRole.id, { SEND_MESSAGES: true }), 100);
                message.reply(" Everyone can type in your diary now!");
            } else if(args[1] === "deny") {
                setTimeout(() => message.channel.updateOverwrite(verifiedRole.id, { SEND_MESSAGES: false }), 100);
                message.reply(" Noone can type in your diary now!");
            }
        } 
    }

    if(command === `migrate_check`) {
        if (message.channel.name.startsWith(diaryTopicNameStartsWith)) {
            let channel = message.channel;

            if(!diaryOwnershipCheck_OLD(channel, message.author)) {
                if(!diaryOwnershipCheck(channel, message.author)) {
                    message.reply("You do not own this diary!");
                    return;
                }
                message.reply("This diary has already been migrated!");
                return;
            }

            message.reply("This diary can be migrated!")
            return;
        }
    }
    else if(command === `migrate`) {
        if (message.channel.name.startsWith(diaryTopicNameStartsWith)) {
            let channel = message.channel;

            if(!diaryOwnershipCheck_OLD(channel, message.author)) {
                if(!diaryOwnershipCheck(channel, message.author)) {
                    message.reply("You do not own this diary!");
                    return;
                }
                message.reply("This diary has already been migrated!");
                return;
            }

            message.reply("This diary can be migrated!")
        
            message.channel.setTopic(`${diaryTopicNameStartsWith}${message.author.id}`);
            if(!diaryOwnershipCheck(channel, message.author)) {
                if(!diaryOwnershipCheck_OLD(channel, message.author)) {
                    message.reply("You do not own this diary!??");
                    return;
                }
                message.reply("Migration has failed somehow????????????????");
                return;
            }

            message.reply("Migrated with success!")

        }
    }
    else if(command === `rename`) {
        let newName = args.slice(0).join(' ');
        message.channel.setName(newName);
        message.reply(`Channel name changed to: ${newName}`);
    }
    else if(command === `transfer`) {
        let userID = args.slice(0).join(' ');

        if (message.mentions.members.first()) {
            userID = message.mentions.members.first().id;
        }
        else {
            userID = args.slice(0).join(' ');
        } 
        message.channel.setTopic(`diary-${userID}`);
        message.reply(`Transfered ownership to: <@${userID}>`);
    }
    else if (command === "public") {

        message.reply("Command obsolete");
        message.reply("Please use *diary global view allow");
        return;
        let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            channel.send(". }")
                .then(msg => {
                    msg.delete({ timeout: 500 })
                    channel.updateOverwrite(verifiedRole.id, { SEND_MESSAGES: false });
                })
                .catch(console.error); 
            
            channel.send(". }")
                .then(msg => {
                    msg.delete({ timeout: 500 })
                    channel.updateOverwrite(verifiedRole.id, { VIEW_CHANNEL: true });
                })
                .catch(console.error);  
        channel.send("Diary has been made public!");
    }
    else if (command === "commenting") {
        let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            message.delete();
            if(args[0] === "on") {
                channel.send(".")
                .then(msg => {
                    msg.delete({ timeout: 100 })
                    channel.updateOverwrite(verifiedRole.id, { SEND_MESSAGES: true });
                })
                .catch(console.error); 
                channel.send("Diary commenting has been enabled.")
            }
            else if(args[0] === "off") {
                channel.send(".")
                .then(msg => {
                    msg.delete({ timeout: 100 })
                    channel.updateOverwrite(verifiedRole.id, { SEND_MESSAGES: false });
                })
                .catch(console.error); 
                channel.send("Diary commenting has been disabled.")
            }
    }
    else if (command === "add") {
        let channel = message.channel;

        if (message.mentions.members.first()) {
            userToVerify = message.mentions.members.first().id;
        }
        else {
            userToVerify = args[0];
        }

        message.reply(`Adding ${message.guild.members.cache.find(r => r.id === userToVerify).user.username} to your diary `)

        setTimeout(() => channel.updateOverwrite(message.guild.members.cache.find(r => r.id === userToVerify).user.id, { VIEW_CHANNEL: true }), 100);
        setTimeout(() => channel.updateOverwrite(message.guild.members.cache.find(r => r.id === userToVerify).user.id, { SEND_MESSAGES: true }), 2000);
    }
    else if (command === "remove") {
        let channel = message.channel;
        if (message.mentions.members.first()) {
            userToVerify = message.mentions.members.first().id;
        }
        else {
            userToVerify = args[0];
        }

        message.reply(`Removed ${message.guild.members.cache.find(r => r.id === userToVerify).user.username} from your diary `)

        setTimeout(() => channel.permissionOverwrites.get(message.guild.members.cache.find(r => r.id === userToVerify).user.id).delete(), 1500);
    }
    else if (command === "private") {
        message.reply("Command obsolete");
        message.reply("Please use *diary global view deny");
        return;
        let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
        channel.send("Diary has been made private!");

        setTimeout(() => channel.updateOverwrite(verifiedRole.id, { VIEW_CHANNEL: false }), 100);
    }
    else if (command === "archive") {
        let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
        channel.updateOverwrite(verifiedRole.id             , { VIEW_CHANNEL : false });
        channel.updateOverwrite(message.author.id,            { SEND_MESSAGES: false });

        let category = message.guild.channels.cache.find(c => c.name == diaryChannelName_Archived && c.type == "category");
        channel.setParent(category);
        channel.send("Diary has been archived!");
    }
    else if (command === "yesstaff") {
        let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            channel.updateOverwrite(staffRoleID, { VIEW_CHANNEL: true });

            channel.send("Staff can now see this!");
    }
    else if (command === "nostaff") {
        let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            channel.updateOverwrite(staffRoleID, { VIEW_CHANNEL: false });

            channel.send("Staff cant see this!");
    }
    else if (command === "close") {
        message.channel.setName(`-deleted-diary-${message.author.username}`);

        let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
        setTimeout(() => channel.updateOverwrite(verifiedRole.id  , { VIEW_CHANNEL: false }), 100);
        setTimeout(() => channel.updateOverwrite(message.author.id, { VIEW_CHANNEL: false }), 1200);
        message.author.send("Your diary has been removed, if this was a mistake please let staff and they can revert it for you");     
    }
});

client.login(config.token);
