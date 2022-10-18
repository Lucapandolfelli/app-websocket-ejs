process.on("message", (message) => {
  const randomNumbers = generateRandomNumbers(message);
  process.send(randomNumbers);
});

process.send("Ready");

const generateRandomNumbers = (cant) => {
  const min = 1;
  const max = 1000;
  const randoms = {};
  for (let i = 0; i < cant; i++) {
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    const key = random.toString().padStart(4, "0");
    if (randoms[key]) {
      randoms[key] += 1;
    } else {
      randoms[key] = 1;
    }
  }
  return randoms;
};
