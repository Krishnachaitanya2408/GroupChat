const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

let clients = [];

server.on("connection", (ws) => {
    clients.push(ws);
    console.log("New client connected!");

    ws.on("message", (message) => {
        const data = JSON.parse(message);
        data.timestamp = new Date().toLocaleTimeString(); // Add timestamp

        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    ws.on("close", () => {
        clients = clients.filter(client => client !== ws);
        console.log("Client disconnected!");
    });
});

console.log("WebSocket server running on ws://localhost:8080");
