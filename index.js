const http = require("http");
const needle = require('needle');

class xPress {

    constructor(httpPort = 8080){
        this.httpPort = httpPort || 8080
        this.route = { "GET": {} };
    }

    //define a get route
    get(path, callBack){ 
        Object.assign(this.route.GET, { [path]: callBack });
    }

    async run(){
        const GETroute = this.route.GET;
        http.createServer(async function(request, response){
            switch(request.method){
                case "GET":
                    if(!Object.keys(GETroute).includes(request.url)){ response.write('400'); return response.end(); }
                    response.write(await GETroute[request.url](request).toString());
                    return response.end();
                default:
                    response.write('Unsupported Method');
                    return response.end();
            }

        }).listen(this.httpPort)
    }
}

const DPress = new xPress();
DPress.get('/date', (req)=>{ return Math.round(Date.now() / 1000) });
DPress.run()