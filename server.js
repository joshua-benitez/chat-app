const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

io.on("connection", (client) => {
  client.on("chat message", (data) => {
    console.log(`${data.username}: ${data.message}`);
    io.emit("chat message", data);
  });

  client.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5500, () => {
  console.log("Server is running on http://localhost:5500");
});
