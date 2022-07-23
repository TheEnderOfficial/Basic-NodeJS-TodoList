const http = require('http');
const fs = require("fs");
const core = require("./core");

const host = "0.0.0.0";
const port = 80;


const requestHandler = async (request, response) => {
    let routes = fs.readdirSync(__dirname + "/routes/");

    let basePath = __dirname + "/routes/";

    const { headers, method, url } = request;
   
    routes.forEach(route => {
        let routePath = basePath + route;
        let routeData = require(routePath);
        if (routeData.url === url) {
            if (routeData.method === method) {
                Promise.all(
                    routeData.middlewares.map(
                        middleware => 
                            new Promise((rs, rj) => 
                                middleware(request, response, rs)
                            )
                    )
                )
                .then(r => {
                    routeData.handler(request, response);
                    response.end()

                })
            }
        }
    })
}

core.initDatabase()

http.createServer(requestHandler).listen(port, host);