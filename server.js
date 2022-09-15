import { mariaDB, sqliteDB } from "./src/config/index.js";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import Contenedor from "./src/container/Contenedor.js";
import http from "http";
import { Server } from "socket.io";
import router from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

const productsContainer = new Contenedor(mariaDB, "productos");
const messagesContainer = new Contenedor(sqliteDB, "messages");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://lucapandolfelli:francoyluca@cluster0.ytxyv2c.mongodb.net/?retryWrites=true&w=majority",
      ttl: 600,
    }),
    secret: "coder",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(router);

// View engine
app.set("view engine", "ejs");
app.set("views", "./src/views");
/*
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hash(password, 8);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
  });
  res.redirect("/login");
});
 */
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
const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Server running on port... ${PORT}`);
});
