function messageGuildOwner(guild, message) {
    guild.members.cache.find(c => c.id == guild.owner.user.id).send(message);
}

var ownersDiscordTag = "Conni!~#0920";
var versionNum = "V0.0.1.0b";

const Discord = require("discord.js");

const config = require("./config.json");

const client = new Discord.Client({ fetchAllMembers: false })

//
// DISCORD JS
//

client.on("ready", async () => {
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
});

client.on("guildCreate", async guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`${client.guilds.cache.size} Servers!`);

});

var prefix = config.prefix; 
var diaryChannelName = "diaries";
var diaryChannelName_Archived = "diaries_a";
let verifiedRole = message.guild.roles.cache.find(c => c.name == "verified");
var diaryChannelNameStartsWith = "diary-";
var staffRoleID = "716273854594678844";

client.on("message", async message => {
    if (message.author.bot) return;

    client.user.setActivity(`${client.guilds.cache.size} Servers!`);

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

    if (command === 'restart') {
        if (message.author.id !== '299709641271672832') {
            return;
        }

        message.channel.send('Restarting.').then(() => {
            process.exit(1);
        })
    }
    else if (command === "create") {
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
                            msg.delete({ timeout: 500 })
                            channel.updateOverwrite(verifiedRole.id, { VIEW_CHANNEL: false });
                        })
                        .catch(console.error);

                    channel.send(". }")
                        .then(msg => {
                            msg.delete({ timeout: 500 })
                            channel.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });
                        })
                        .catch(console.error);

                    channel.send(". }")
                        .then(msg => {
                            msg.delete({ timeout: 500 })
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

                    channel.setTopic(message.author.id);
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
    else if (command === "public") {
        if (message.channel.name.startsWith(diaryChannelNameStartsWith)) {
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
    }
    else if (command === "add") {
        let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
         if (message.channel.topic !== message.author.id) {
            message.reply("You do not own this diary!");
            return;
        }

        if (message.mentions.members.first()) {
            userToVerify = message.mentions.members.first().id;

        }
        else {
            userToVerify = args[0];
        }

        message.reply(`Adding ${message.guild.members.cache.find(r => r.id === userToVerify).user.username} to your diary `)

        channel.send(".")
            .then(msg => {
                msg.delete({ timeout: 500 })
                channel.updateOverwrite(message.guild.members.cache.find(r => r.id === userToVerify).user.id, { VIEW_CHANNEL: true });
            })
            .catch(console.error);  


        channel.send(".")
            .then(msg => {
                msg.delete({ timeout: 500 })
                channel.updateOverwrite(message.guild.members.cache.find(r => r.id === userToVerify).user.id, { SEND_MESSAGES: true });
            })
            .catch(console.error);  


    }
    else if (command === "remove") {
        let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
        if (message.channel.topic !== message.author.id) {
            message.reply("You do not own this diary!");
            return;
        }

        if (message.mentions.members.first()) {
            userToVerify = message.mentions.members.first().id;

        }
        else {
            userToVerify = args[0];
        }

        message.reply(`Removed ${message.guild.members.cache.find(r => r.id === userToVerify).user.username} from your diary `)

        channel.send(".")
            .then(msg => {
                msg.delete({ timeout: 500 })
                channel.permissionOverwrites.get(message.guild.members.cache.find(r => r.id === userToVerify).user.id).delete(); 
            })
            .catch(console.error);
    }
    else if (command === "private") {
        if (message.channel.name.startsWith(diaryChannelNameStartsWith)) {
            let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            channel.updateOverwrite(verifiedRole.id, { VIEW_CHANNEL: false });
            channel.send("Diary has been made private!");
            channel.send(". }") 
                .then(msg => {
                    msg.delete({ timeout: 500 })
                    channel.updateOverwrite(verifiedRole.id, { SEND_MESSAGES: false });
                })
                .catch(console.error);     
        }
    }
    else if (command === "archive") {
        if (message.channel.name.startsWith(diaryChannelNameStartsWith)) {
            let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            channel.updateOverwrite(verifiedRole.id             , { VIEW_CHANNEL : false });
            channel.updateOverwrite(message.author.id,            { SEND_MESSAGES: false });

            let category = message.guild.channels.cache.find(c => c.name == diaryChannelName_Archived && c.type == "category");
            channel.setParent(category);

            channel.send("Diary has been archived!");
        }
    }
    else if (command === "yesstaff") {
        if (message.channel.name.startsWith(diaryChannelNameStartsWith)) {
            let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            channel.updateOverwrite(staffRoleID, { VIEW_CHANNEL: true });

            channel.send("Staff can now see this!");
        }
    }
    else if (command === "nostaff") {
        if (message.channel.name.startsWith(diaryChannelNameStartsWith)) {
            let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            channel.updateOverwrite(staffRoleID, { VIEW_CHANNEL: false });

            channel.send("Staff cant see this!");
        }
    }
    else if (command === "close") {
        if (message.channel.name.startsWith("diary-")) {
            message.channel.setName(`-deleted-diary-${message.author.username}`);

            let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            channel.updateOverwrite(verifiedRole.id  , { VIEW_CHANNEL: false });
            channel.updateOverwrite(message.author.id, { VIEW_CHANNEL: false });
            message.author.send("Your diary has been removed, if this was a mistake please let staff and they can revert it for you");

        } else {
            let channel = message.guild.channels.cache.find(c => c.name == message.channel.name);
            if (message.channel.name.startsWith("deleted-diary-")) {
                channel.send(`<@${message.author.id}> already deleted!`);
            } else {
                channel.send(`<@${message.author.id}> this is not a diary channel!`);
            }

        }
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
});

client.login(config.token);
