const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Test route (important for checking REST still works) */
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});

/* Create HTTP server */
const httpServer = http.createServer(app);

/* Attach Socket.io */
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

/* Socket connection */
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const PORT = 5050;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});