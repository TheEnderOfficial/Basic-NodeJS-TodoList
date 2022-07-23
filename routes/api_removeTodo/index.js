const core = require('../../core');
const bodyParser = require('../../middlewares/bodyParser');

module.exports = {
    url: "/api/removeTodo",
    method: "POST",
    middlewares: [bodyParser],
    handler: (request, response) => {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(core.removeTodo(request.body.id)));
    }
}