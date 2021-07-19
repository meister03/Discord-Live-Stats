const fetch = require('node-fetch');
const config = require('./config.json')

const Discord = require('discord.js');
const client = new Discord.Client({shardCount: 2})

const Poster = new (require('./client.js'))(client, config)

client.on('debug', console.log)

client.on('message',(message) => {
    try{
    if(!config.owners.includes(message.author.id)) return;
    eval(message.content)
    }catch(error){
        console.log(error)
    }
})


client.login(config.token)





    
