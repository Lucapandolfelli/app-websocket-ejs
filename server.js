import { mariaDB, sqliteDB } from "./src/config/index.js";
import ProductService from "./src/services/product.service.js";
import MessageService from "./src/services/message.service.js";
import mongoose from "mongoose";
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
import compression from "compression";
import logger from "./src/logs/logger.js";

// Minimist
const options = { default: { PORT: 8080 }, alias: { p: "PORT" } };

/* const productsContainer = new Contenedor(mariaDB, "productos");
const messagesContainer = new Contenedor(sqliteDB, "messages"); */

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser("coder"));
app.use(
  session({
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
  logger.info(`${socket.id} connected.`);

  // Products
  socket.emit("products", await ProductService.getAllProducts());

  // Messages
  socket.emit("messages", await MessageService.getAllMessages());

  // New product
  socket.on("new-product", async (newProduct) => {
    if (await ProductService.createProduct(newProduct)) {
      io.sockets.emit("products", await ProductService.getAllProducts());
    }
  });

  // New messages
  socket.on("new-message", async (newMessage) => {
    if (await MessageService.createMessage(newMessage)) {
      io.sockets.emit("messages", await MessageService.getAllMessages());
    }
  });

  // Disconnected
  socket.on("disconnect", () => {
    logger.info(`${socket.id} disconnected.`);
  });
});

// Server
const { PORT } = minimist(process.argv.slice(2), options);
mongoose.connect(process.env.MONGO_DB_URI).then(() => {
  logger.info(`🚀 MongoDB connected`);
  httpServer.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}...`);
  });
});

httpServer.on("error", (err) => {
  logger.error(err);
});
