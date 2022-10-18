import { Router } from "express";
import { fork } from "child_process";
import cluster from "cluster";
import { cpus } from "os";
import { createServer } from "http";

const router = Router();
const numCPUs = cpus().length;
const PORT = 8081;

const forked = fork("./src/utils/generateRandomNumbers.js");

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
        forked.send(1000);
        forked.on("message", (message) => {
          res.json(message);
        });
      }
    });
  }
});

const info = {
  num_random: 2,
  numCPUs: numCPUs,
};

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

export default router;
