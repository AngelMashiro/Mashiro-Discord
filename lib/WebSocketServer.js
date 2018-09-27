const WebSocket = require('ws');
const validToken = "z2qN8KoPgn";

class WebSocketServer {
    constructor() {
        this.wss =  new WebSocket.Server({port: 8080, verifyClient});
    }

    // Broadcast to all.
    sendAll(data) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN)
                client.send(data);
        });
    }
}

function verifyClient(info, done) {
    const cookies = info.req.headers.cookie.split("; "); 
    const cookieToken = cookies.find(elem => elem.startsWith("ws_token"));
    const tokenValue = cookieToken.split("=")[1];

    if (tokenValue == validToken)
        done(true);
    else
        done(false, 401, 'Unauthorized')
}



module.exports = new WebSocketServer();