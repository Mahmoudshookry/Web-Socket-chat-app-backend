const http = require("http");
const server = http.createServer();

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New Connection", socket.id);
  socket.on("message", (message) => {
    console.log(message);
    if (message.id) {
      io.to(message.id).emit("message", message);
      console.log(message.id);
    } else {
      socket.broadcast.emit("message", message);
    }
  });
});

server.listen(5000, (err) => {
  if (err) console.log("the port " + 5000 + " is busy");
  else console.log("the server started correcttly on port " + 5000);
});
