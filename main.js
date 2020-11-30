function messageGuildOwner(guild, message) {
    guild.members.cache.find(c => c.id == guild.owner.user.id).send(message);
}

const config = require("./config.json");

const Discord = require("discord.js");
const client = new Discord.Client({ fetchAllMembers: true })



var ownersDiscordTag = "Conni!~#0920";
var versionNum = "V0.0.1.0b";

//
// DISCORD JS
//

client.on("guildCreate", async guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    messageGuildOwner(guild, "This message is sent to the server owner only!");
    messageGuildOwner(guild, "Thanks for adding me to your server here is the website link for my command list!");
    messageGuildOwner(guild, "https://connithekiwi.github.io/Fyre-The-Cleaner/");

    statusText = `${client.guilds.cache.size} Servers!`;
    client.user.setActivity(statusText);

});

client.on("message", async message => {
    statusText = `${client.guilds.cache.size} Servers!`;
    client.user.setActivity(statusText);

    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    ISME = message.mentions.members.first() || message.guild.members.resolveID(args[0]);
    if (ISME && ISME.id === "727975843049242650") {
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
            if (message.author.id !== '299709641271672832') {
                return;
            }
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

                    let category = message.guild.channels.cache.find(c => c.id == `732940094574690304` && c.type == "category");

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
                    channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
                    channel.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });

                    message.channel.send(`Heres your diary <@${message.author.id}>! - <#${channel.id}>`)
                        .then(msg => {
                            msg.delete({ timeout: 5000 })
                        })
                        .catch(console.error);
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
        if (message.channel.name.startsWith("diary-")) {
            message.channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: true });
        }
    }
    else if (command === "private") {
        if (message.channel.name.startsWith("diary-")) {
            message.channel.updateOverwrite(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
        }
    }
    else if (command === "close") {
        if (message.channel.name.startsWith("diary-")) {
            message.updateOverwrite(message.author.id, { VIEW_CHANNEL: false });
        }
    }
    else if (command === "info") {
        message.channel.send(`${ownersDiscordTag} - Version: ${versionNum}`);
    }
    else if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed();
        helpEmbed
            .setColor(16726994)
            .setAuthor(client.user.username, client.user.avatarURL, 'https://discord.gg/jYFHdE')
            .setTimestamp()
            .setFooter('Diary-Bot', `https://i.imgur.com/91GaUEd.png`)
            .setTitle('Diary-Bot - Commands')
            .addFields(
                { name: 'info', value: 'show user info', inline: false }
        );
        message.channel.send(helpEmbed);

    }
});

client.login(config.token);