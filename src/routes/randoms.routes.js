import { Router } from "express";
import { fork } from "child_process";

const router = Router();
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
        forked.send(100000000);
        forked.on("message", (message) => {
          res.json(message);
        });
      }
    });
  }
});

export default router;
