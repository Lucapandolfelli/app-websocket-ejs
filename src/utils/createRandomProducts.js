import { faker } from "@faker-js/faker";

const createRandomProducts = (quantity) => {
  const products = [];
  for (let i = 0; i < quantity; i++) {
    const randomProduct = {
      id: faker.random.numeric(),
      title: faker.commerce.product(),
      price: faker.commerce.price(100, 200, 0, "$"),
      thumbnail: faker.image.cats(100, 100, true),
    };
    products.push(randomProduct);
  }
  return products;
};

export default createRandomProducts;
