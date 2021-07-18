const config = require("./config.json")
const Passport = require("discord-passport");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const posts = [
  {
    id: 0,
    status: 'online',
    message: 'Heartbeat received ',
  },
  {
    id: 1,
    status: 'online',
    message: 'Heartbeat received',
  },
  {
    id: 2,
    status: 'offline',
    message: 'Heartbeat acked 10s ago',
  },
  {
    id: 3,
    status: 'online',
    message: 'Heartbeat received',
  },
]
const data = {status: 'Online', cpu: `${(Math.random()*3).toFixed(2)}%`, ram: `${getRamUsageinMB()} MB`, ping: `20 ms`, servercount: `1000 Guilds`, color: `green` , start: `20m`};


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);


app.get('/',(req, res) => {
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.bot.client_id}&redirect_uri=${config.redirect_uri}&response_type=code&scope=${config.scope.join('+')}`)
})

app.get('/login', async (req, res) => {
  const code = req.query.code;
  const passport = new Passport({
      code: code,
      client_id: config.bot.client_id,
      client_secret: config.bot.client_secret,
      redirect_uri: config.redirect_uri,
      scope: config.scope
  })
  await passport.open(); // Trades your code for an access token and gets the basic scopes for you.
  if(config.owners.includes(passport.user.id)){
    res.render("starter", {posts: posts, config: config, data: data});
  }else{
    return res.end(`Access denied!`);
  }
})

let i = 0;
app.get("/status", (req, res) =>{
  i++
  let status = 'online';
  let msg2;
  if(i < 5){
    status = 'offline';
    msg2    = `Waiting for Guilds since ${i}s`
  }
  let msg;
  if(i === 1){
    msg = `now`

  }else{
    msg = `${i}s ago`
  }
  const newposts = [
    {
      id: 0,
      status: 'online',
      message: `Heartbeat received ${msg}`,
      ram: `${getRamUsageinMB()} MB`
    },
   
  ]
    res.send(newposts);
    if(i === 10) i =0;
    return;
})


app.get("/shard", (req, res) => {
  const shardid = req.query.shardid;
  res.send({status: 'Online', cpu: `${(Math.random()*3).toFixed(2)}%`, ram: `${getRamUsageinMB()} MB`, ping: `20 ms`, servercount: `1000 Guilds` })
  return;
})


app.post('/stats', (req, res) => {
  console.log(req.body)
})




function getRamUsageinMB(){
  let mem = process.memoryUsage();
  return (mem.rss / 1024 / 1024).toFixed(2);
}

