import knex from "knex";
import logger from "../logs/logger.js";

class Contenedor {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async save(element) {
    try {
      return this.knex.insert(element).into(this.table);
    } catch (err) {
      logger.error(err);
      return err;
    }
  }

  async getAll() {
    try {
      return this.knex.select("*").from(this.table);
    } catch (err) {
      logger.error(err);
      return err;
    }
  }
}

export default Contenedor;
