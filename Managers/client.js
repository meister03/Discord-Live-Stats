const fetch = require('node-fetch');
class Client{
    constructor(client, config){
        this.client = client;
        this.config = config;
        this.shardMessage = new Map();
        this.deleteCachedShardStatus();
        this._attachEvents();
        this._autopost();
    }
    
    post(){
        const shards = [...this.client.ws.shards.values()]
        const guilds = [...this.client.guilds.cache.values()]
  
        for(let i = 0; i < shards.length; i++){
          const body =  {
             "id": shards[i]?.id,
             "status": shards[i]?.status,
             "cpu": (Math.random()*3).toFixed(2),
             "ram": getRamUsageinMB(),
             "message": (this.shardMessage.get(shards[i]?.id) || `No Message Available`),
             "ping": shards[i]?.ping,
             "guildcount": (guilds?.filter(x => x.shardID === shards[i].id)?.length || 0),
             "upsince": this.client.uptime,
           };
           fetch(`${this.config.stats_uri}stats`, {
             method: 'post',
             body:    JSON.stringify(body),
             headers: { 
                 'Authorization': Buffer.from(this.config.authorizationkey).toString('base64'),
                 'Content-Type': 'application/json' 
             },
           }).catch((e) => console.log(new Error(e)))
        }
    }

    deleteCachedShardStatus(){
          fetch(`${this.config.stats_uri}deleteShards`, {
            method: 'post',
            body:  JSON.stringify({shards: 'all'}),
            headers: { 
                'Authorization': Buffer.from(this.config.authorizationkey).toString('base64'),
                'Content-Type': 'application/json' 
            },
          }).catch((e) => console.log(new Error(e)))
    }

    _autopost(){
        setInterval(()=> {
              this.post()          
        }, this.config.postinterval)
    }

    _attachEvents(){
        this.client.on('debug', (message) => {
            if(message.includes(`Shard`)){
                const shards = [...this.client.ws.shards.values()]
                for(let i = 0; i < shards.length; i++){
                    if(message.includes(`[WS => Shard ${shards[i].id}]`)){
                        this.shardMessage.set(shards[i].id, message.replace(`[WS => Shard ${shards[i].id}]`, ''))
                    }
                }
            }
        })
    }
}
module.exports = Client;


function getRamUsageinMB(){
  let mem = process.memoryUsage();
  return Number((mem.rss / 1024 / 1024).toFixed(2));
}