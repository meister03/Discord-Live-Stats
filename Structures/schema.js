class Schema{
    constructor(data){
        this.id = data.id ?? `NG`;
        this.status = data.status ?? 5;
        this.cpu = data.cpu ?? NaN;
        this.ram = data.ram ?? NaN;
        this.ping = data.ping ?? NaN;
        this.message =  data.message ?? `No Data Recieved`;
        this.guildcount = data.guildcount ?? NaN;
        this.upsince = data.upsince ?? 0;
    }
    toObject(){
        return this;
    }
}
module.exports = Schema;
