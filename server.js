const bodyParser = require("body-parser");
const Passport = require("discord-passport");
const Events = require('events');
const express = require('express')

const form = require('./formdata.js');
const Schema = require("./schema.js");
const FormData = new form();

class Server extends Events{
    constructor(app, config){
        super()
        this.app = app;
        this.config = config;
        this._validateOptions();
        this._applytoApp();
        this._buildRoute();
    }

    _applytoApp(){
        this.app.use(express.static(__dirname + '/'));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.engine('html', require('ejs').renderFile);
        this.app.set('view engine', 'ejs');
        this.app.set('views', __dirname);
    }
    _buildRoute(){
        this.app.get(`/${this.config.login_path}`,(req, res) => {
            res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${this.config.bot.client_id}&redirect_uri=${this.config.redirect_uri}&response_type=code&scope=${this.config.scope.join('+')}`)
        })
        this.app.get('/login', async (req, res) => {
            return res.render("starter", {posts: FormData.humanize(FormData.shardData(0, {all: true})), config: this.config, data: FormData.humanize(FormData.totalData())});
            try{
                const code = req.query.code;
                if(!code) return res.redirect('/');
                const passport = new Passport({
                    code: code,
                    client_id: this.config.bot.client_id,
                    client_secret: this.config.bot.client_secret,
                    redirect_uri: this.config.redirect_uri,
                    scope: this.config.scope
                })
                await passport.open(); // Trades your code for an access token and gets the basic scopes for you.
                if(this.config.owners.includes(passport.user.id)){
                    console.log(FormData.humanize(FormData.totalData()))
                    res.render("starter", {posts: FormData.humanize(FormData.shardData(0, {all: true})), config: this.config, data: FormData.humanize(FormData.totalData())});
                }else{
                    return res.end(`Access denied!`);
                }
            }catch(error){
                this.emit('error', error)
            }
        })
          
          
        this.app.get("/status", (req, res) =>{
            try{
                const shardData = FormData.shardData(0, {all: true})
                const totalData = FormData.totalData()
                res.send({shards: FormData.humanize(shardData), total: FormData.humanize(totalData)});
                return;
            }catch(error){
                this.emit('error', error)
            }
        })
          
          
        this.app.get("/shard", (req, res) => {
            try{
                const shardid = req.query.shardid;
                let data = FormData.shardData(Number(shardid));
                if(!data) data = new Schema({id: shardid}).toObject();
                res.send(FormData.humanize(data))
                return res.end();
            }catch(error){
                this.emit('error', error)
            }
        })
          
          
        this.app.post('/stats', (req, res) => {
            try{
                const rawdata = new Schema(req.body).toObject();
                FormData._patch(rawdata);
                setTimeout(()=> {
                    this._checkIfShardAlive(rawdata.id)
                }, this.config.markShardasDeadafter)
                res.send({status: `Success`})
                return res.end();
            }catch(error){
                this.emit('error', error)
            }
        })

        this.app.post(`/deleteShards`, (req, res) =>{
            FormData.shard.clear();
            
        })
    }


    _checkIfShardAlive(shardID){
        const data = FormData.shardData(Number(shardID));
        const diff = Number(data.lastupdated + this.config.markShardasDeadafter -1000);
        console.log((Date.now()-diff))
        if(diff > Date.now()) return ;
        data.upsince = 0;
        data.status = 5;
        data.message = `Died | No Message Recieved`;
        FormData._patch(data);
        return;
    }

    _validateOptions(){

    }
}
module.exports = Server;