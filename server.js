import { mariaDB, sqliteDB } from "./config/index.js";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import Contenedor from "./container/Contenedor.js";
import http from "http";
import { Server } from "socket.io";
/* import router from "./routes/index.js"; */
import cookieParser from "cookie-parser";

const productsContainer = new Contenedor(mariaDB, "productos");
const messagesContainer = new Contenedor(sqliteDB, "messages");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(router); */
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

// View engine
app.set("view engine", "ejs");
app.set("views", "./views");

const isAuth = (req, res, next) => {
  if (req.session.username) {
    return next();
  }
  res.redirect("/login");
};

// Routes
app.get("/", isAuth, (req, res) => {
  res.render("index.ejs", {
    username: req.session.username,
  });
});

app.get("/logout", (req, res) => {
  res.render("./pages/logout.ejs", {
    username: req.session.username,
  });
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout error", body: err });
    }
  });
});

app.get("/login", (req, res) => {
  res.render("./pages/login.ejs");
});

app.post("/login", (req, res) => {
  const { username } = req.body;
  if (username == "Pepe") {
    req.session.username = username;
    res.redirect("/");
  }
  res.send("Login error");
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
const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Server running on port... ${PORT}`);
});
