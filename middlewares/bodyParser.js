module.exports = (request, response, next) => {
    (async () => {
        let buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
    
        const data = Buffer.concat(buffers).toString();
        request.body = JSON.parse(data);
    })().then(next)
}