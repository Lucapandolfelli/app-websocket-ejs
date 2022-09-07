import { mariaDB, sqliteDB } from "./config/index.js";
import express from "express";
import Contenedor from "./container/Contenedor.js";
import http from "http";
import { Server } from "socket.io";
import router from "./routes/index.js";

const productsContainer = new Contenedor(mariaDB, "productos");
const messagesContainer = new Contenedor(sqliteDB, "messages");

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = http.createServer(app);
const io = new Server(httpServer);

/* const addIdAndPushToArray = (array, newItem) => {
  const ids = array.map((item) => item.id);
  if (ids.length === 0) {
    newItem.id = 1;
  } else {
    let maxId = Math.max(...ids);
    newItem.id = maxId + 1;
  }
  array.push(newItem);
};

let productos = [];
let mensajes = []; */

// Middlewares
app.use(express.static("public"));
app.use(router);

// View engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Socket.io
io.on("connection", async (socket) => {
  // Connected
  console.log(`${socket.id} connected.`);

  // Products
  socket.emit("products", await productsContainer.getAll());

  // Messages
  socket.emit("messages", await messagesContainer.getAll());

  // New product
  socket.on("new-product", async (newProduct) => {
    if (await productsContainer.save(newProduct)) {
      io.sockets.emit("products", await productsContainer.getAll());
    }
  });

  // New messages
  socket.on("new-message", async (newMessage) => {
    if (await messagesContainer.save(newMessage)) {
      io.sockets.emit("messages", await messagesContainer.getAll());
    }
  });

  // Disconnected
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected.`);
  });
});

// Server
httpServer.listen(PORT, () => {
  console.log(`Server running on port... ${PORT}`);
});
