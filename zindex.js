const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.use(express.static(__dirname + '/'));


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



app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get("/start", (req, res) => {
  res.render("starter", {posts: posts});


});


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
    {
      id: 1,
      status: status,
      message: msg2,
      ram: `${getRamUsageinMB()} MB`
    },
    {
      id: 2,
      status: 'offline',
      message: `No Heartbeat | Disconnected `,
      ram: `${getRamUsageinMB()} MB`
    },
    {
      id: 3,
      status: 'online',
      message: `Heartbeat received ${msg}`,
      ram: `${getRamUsageinMB()} MB`,
    },
    {
      id: 4,
      status: 'online',
      message: `Heartbeat received ${msg}`,
      ram:  `${getRamUsageinMB()} MB`,
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




function getRamUsageinMB(){
  let mem = process.memoryUsage();
  return (mem.rss / 1024 / 1024).toFixed(2);
}

