<p align="center"><a href="https://nodei.co/npm/discord-live-stats/"><img src="https://nodei.co/npm/discord-live-stats.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/discord-live-stats"> <img src="https://img.shields.io/npm/dm/discord-live-stats?label=downloads"> <img src="https://img.shields.io/npm/l/discord-live-stats"> <img src="https://img.shields.io/github/repo-size/meister03/discord-live-stats">  <a href="https://discord.gg/YTdNBHh"><img src="https://discordapp.com/api/guilds/697129454761410600/widget.png" alt="Discord server"/></a></p>

# Discord-Live-Stats Dashboard
The ultimate package for checking Shard-Live-Stats & Bot-Live-Stats. See & get informed and get control over each Shard.

# Features:
- Shard & Bot Status, RAM, CPU, PING, GuildCount & Last Message (Debug Message)
- Kill specific Shards with a Button
### On Work:
- Manage Shard from Dashboard (respawn...)
- Guild Rentention
- Notification on Discord & Browser, when Shards are offline
- Commands Stats & User Activity

## Showcase:
![](https://media.discordapp.net/attachments/711563835424768063/867100235352637480/unknown.png)

### See below for the Docs
**If you need help feel free to join our <a href="https://discord.gg/YTdNBHh">discord server</a>. We will provide you all the help you need ☺**
# Download
You can download it from npm:
```cli
npm i discord-live-stats
```
- Typings are on work for TypeScript-Devs 

# Getting Started:
First of all, you have to create a new File, which can be named `server.js`. 

In the server.js File you will need to insert the Code below, and install the NPM Package `express` by using `npm i express`

Scroll down for Api References

File: `server.js`
```js
const Stats  = require('discord-live-stats');

const express = require("express");
const app = express();

const client = new Stats.Server(app, {
    bot: {
        name: "Your Bot Name",
        icon: "Your Discord Bot Avatar URL",
        website: "Your Website URL",
        client_id: "Discord Bot ID",
        client_secret: "Discord Bot Client_Secret (Not Token)"
    },
    stats_uri: "http://localhost:3000/", //Base URL
    redirect_uri: "http://localhost:3000/login", //Landing Page
    owners: ["Bot_Owner1", "Bot_Owner2"],
    authorizationkey: "Your Password for verifying requests",
})

client.on('error', console.log)

app.listen(3000, () => {
  console.log("Application started, listening on port 3000!");
});
```
You can start now start your Dashboard with `node server.js`.

[Go to the Discord Developer Portal and to Authorization and insert your `redirect_uri` there](https://media.discordapp.net/attachments/756591979097227295/871290682201997332/unknown.png?width=1025&height=383)

Now go to the `stats_uri` link or your choosen link and you should be redirected to the Dashboard with no Data.

## Pushing Data of your Client on the Dashboard
Follow the upper step before doing this step.

Open your `bot.js` File, where you login in the Client and insert this:

File: `bot.js`
```js
const Stats  = require('discord-live-stats');
const Discord = require('discord.js');
const client = new Discord.Client()

const Poster = new Stats.Client(client, {
    stats_uri: 'http://localhost:3000/',
    authorizationkey: "Your Password for verifying requests | Same as in Server.js",
})
/*
* YOUR BOT CODE STUFF
*/
client.login(`Your_Bot_Token`)
```

When you start your bot with or without Sharding, the Dashboard should show some information such as Status, Ram, Cpu, Ping, Guildcount and more data of each Shard and of all guilds in total.

# API References:

### new Server(EXPRESS_APP, config) && new Client(DISCORD_CLIENT, config)
| Config Options | Default | Description |
| -------------- | ------------- |-------------- |
|  bot.name      | 'required' | The Discord Bot Name |
|  bot.icon      | 'required' | The icon url for the html page |
|  bot.website   | 'required' | The Bot Website on the Footer |
|  bot.client_id | 'required' | [The Discord Bot ID](https://support.heateor.com/discord-client-id-discord-client-secret/ )          |
| bot.client_secret | 'required' | [The Discord Bot's Client Secret (Not Token)](https://support.heateor.com/discord-client-id-discord-client-secret/ )          |
| stats_uri      | 'required' | The Base Dashboard Link |
| redirect_uri   | 'required' | The Discord Bot Redirect Url after authorization |
| scope          | ['indentify'] |Scopes, which should be used for authorization   |
| owners         |'required' | Array of Bot Owners, which can access the Dashboard |
| postinterval   | 1000ms | The Post Interval of the new client data |
| login_path     | '/' | The Path, where you can authorize yourself for accessing the Dashboard |
| authorizationkey | 'required' | A random chosen Password/Key, which is used for verifying requests. |
| markShardasDeadafter | 5000ms |How long to wait until the Shard is marked as dead on the Dashboard, when no new Data has been recieved |


**Have fun! and feel free to contribute/suggest or contact me on my <a href="https://discord.gg/Yb26ACzFSP">Discord Server</a> or DM me `Meister#9667`**

# Bugs, Glitches and Issues
If you encounter any problems, feel free to <a href="https://github.com/meister03/discord-live-stats/issues">open up an issue</a> in our github repository or <a href="https://discord.gg/Yb26ACzFSP">join our discord server</a>!

# Credits
Partial Credits goes to [ADMIN LTE](https://adminlte.io/) for a good Starter Template, CSS and the Plugins...

**When you create Forks of this Package, do not remove the Credits :)**
