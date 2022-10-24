import { Router } from "express";
import { fork } from "child_process";
import cluster from "cluster";
import { createServer } from "http";
import { cpus } from "os";

const numCPUs = cpus().length;
const router = Router();

// CLASE 28
/* const forked = fork("./src/utils/generateRandomNumbers.js");

forked.on("message", (message) => {
  if (message == "Ready") {
    router.get("/randoms", (req, res) => {
      const { cant } = req.query;
      if (cant) {
        forked.send(cant);
        forked.on("message", (message) => {
          res.json(message);
        });
      } else {
        forked.send(1);
        forked.on("message", (message) => {
          res.json(message);
        });
      }
    });
  }
}); */

// CLASE 30
/* if (cluster.isPrimary) {
  console.log(`I am a master ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`${worker.process.pid} is finished`);
  });
} else {
  createServer((req, res) => {
    res.json(info);
  }).listen(PORT);
  console.log(`Worker ${process.pid} started`);
} */

/* router.get("/randoms", (req, res) => {
  res.json(info);
}); */

router.get("/randoms", (req, res) => {
  const info = {
    num_random: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
    numCPUs: numCPUs,
    PORT: process.argv[3],
  };
  res.json(info);
});

export default router;
