import { mariaDB, sqliteDB, mongoDB } from "./src/config/index.js";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import Contenedor from "./src/container/Contenedor.js";
import http from "http";
import { Server } from "socket.io";
import router from "./src/routes/index.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./src/middleware/passport.js";
import minimist from "minimist";

// Minimist
const options = { default: { PORT: 8080 }, alias: { p: "PORT" } };

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
      mongoUrl: process.env.MONGO_ATLAS_URI,
      ttl: 600,
    }),
    secret: "coder",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(router);

// View engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

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
const { PORT } = minimist(process.argv.slice(2), options);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}...`);
});
