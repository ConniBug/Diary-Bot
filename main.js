function parseHrtimeToSeconds(hrtime) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
}

function messageGuildOwner(guild, message) {
    guild.members.cache.find(c => c.id == guild.owner.user.id).send(message);
}

function nuke(channelID) {
    var channel = client.channels.cache.find(c => c.id == channelID);

    channel.bulkDelete(100).then(() => {

    })
}

var ownersDiscordTag = "Conni!~#0920";
var versionNum = "V0.0.1.0b";

const fs = require('fs');

const Discord = require("discord.js");

const config = require("./config.json");

const client = new Discord.Client({ fetchAllMembers: true })

var isLoaded = false;

//
// DISCORD JS
//

// Bot status
client
    .on("reconnecting", () => {
        console.warn("Fyre is reconnecting...");
    })
    .on("disconnect", () => {
        console.warn("Warning! Fyre has disconnected!");
    });

client.on("ready", async () => {
    console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
    isLoaded = true;
});

client.on("guildCreate", async guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    messageGuildOwner(guild, "This message is sent to the server owner only!");
    messageGuildOwner(guild, "Thanks for adding me to your server here is the website link for my command list!");
    messageGuildOwner(guild, "https://connithekiwi.github.io/Fyre-The-Cleaner/");
});

client.on("guildDelete", async guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {

    statusText = `${client.guilds.cache.size} Servers!`;
    client.user.setActivity(statusText);//${client.guilds.cache.size} servers`);

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

    console.log(command);
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
    else if (command === "config") {
        let rMember = message.guild.member(message.author.id);

        if (!rMember.hasPermission("ADMINISTRATOR")) {
            const statsEmbed = new Discord.MessageEmbed();
            statsEmbed
                .setColor(16726994)
                .setTitle("Your not an admin sorry!");

            message.channel.send(statsEmbed)
                .then(msg => {
                    msg.delete({ timeout: 3000 })
                })
                .catch(console.error);

        };
        const values = ["canVerifyRole_1", "verifiedRole", "prefix"];
        const valuesDef = ["N/A", "N/A", "fy!"];
        const valuesShot = ["canverify", "verifiedrole", "prefix"];
        var i = 0;

        var col = "N";
        var val = "N";
        var where = message.guild.id;
        valuesShot.forEach(e => {
            if (args[0] === e) {
                if (args[1] === "set") {

                    col = values[i];
                    val = args[2];
                }
                else if (args[1] === "reset") {
                    col = values[i];
                    val = valuesDef[i];
                }

                const statsEmbed = new Discord.MessageEmbed();

                statsEmbed
                    .setColor(16726994)
                    .setTitle("Server Config")
                    .addField(`${e} has been updated`, `now ${val}`)
                    ;
                message.channel.send(statsEmbed);

            }
            i = i + 1;
        });

        const statsEmbed = new Discord.MessageEmbed();
        if (col !== "N") {
            (await connection).query(`UPDATE guildConfigs SET ${col} = '${val}' WHERE guildID=${where}`);
        }
        else {
            statsEmbed
                .setColor(16726994)
                .setTitle("Server Config")
                .addField("Server Prefix     [Prefix]", prefix)
                .addField(`Trusted Server (contact '${ownersDiscordTag}' if needed)`, trustedGuild)
                .addField("Can verify role   [canverif]", `<@&${canVerifyRole_1}>`)
                .addField("Verified Role     [verifiedrole]", `<@&${verifiedRole}>`)
                ;
            message.channel.send(statsEmbed);

        }

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
                    //channel.updateOverwrite(role, { VIEW_CHANNEL: true });

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
        if (message.channel.name.startsWith("priv-room")) {
            message.channel.delete();
        }
    }
    else if (command === "info") {
        message.channel.send(`${ownersDiscordTag} - Version: ${versionNum}`);
        //message.channel.send("Fyre Server Stats: https://fyrethecleaner.statuspage.io/");
    }
    else if (command === "help") {
        const helpEmbed = new Discord.MessageEmbed();
        helpEmbed
            .setColor(16726994)
            .setAuthor(client.user.username, client.user.avatarURL, 'https://discord.gg/jYFHdE')
            .setTimestamp()
            .setFooter('FireworkBot~ uwu', `https://i.imgur.com/91GaUEd.png`)
            .setTitle('Firework Bot - Commands')
            .addFields(
                { name: 'config', value: 'display current config', inline: false },
                { name: 'config <key> set/reset <value>', value: 'manages configs', inline: false },
                { name: 'checkall', value: 'Checks the server for blacklisted users', inline: false },
                { name: 'botstats', value: 'checks if the bot is already scanning a server', inline: false },
                { name: 'newusers <count>', value: 'Displays a list of the newest users', inline: false },
                { name: 'oldusers <count>', value: 'Displays a list of the oldest users', inline: false },
                //{ name: '\u200B', value: '\u200B' },
                //{ name: 'submit', value: 'Manuely submit a user to the DB', inline: false },
            );

        message.channel.send(`${ownersDiscordTag} - Version: ${versionNum}`);
        //message.channel.send("Fyre Server Stats: https://fyrethecleaner.statuspage.io/");

        message.channel.send(helpEmbed);

    }
});

client.login(config.token);