const core = require('../../core');

module.exports = {
    url: "/api/getTodos",
    method: "GET",
    middlewares: [],
    handler: (request, response) => {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(core.getTodos()));
    }
}