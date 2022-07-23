const fs = require('fs');

module.exports = {
    url: "/",
    method: "GET",
    middlewares: [],
    handler: (request, response) => {
        let template = fs.readFileSync(__dirname + "/index.html", {encoding: "utf8"});

        let data = template
        
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
    }
}