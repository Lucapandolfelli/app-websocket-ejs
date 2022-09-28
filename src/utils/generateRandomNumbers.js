process.on("message", (message) => {
  const randomNumbers = generateRandomNumbers(message);
  process.send(randomNumbers);
});

process.send("Ready");

const generateRandomNumbers = (cant) => {
  const array = [];
  for (let i = 0; i < cant; i++) {
    const number = Math.floor(Math.random() * (1000 - 1)) + 1;
    let randomNumber = {
      number: number,
      repeated: array.filter((item) => item == number).length,
    };
    array.push(randomNumber);
  }
  return array;
};
