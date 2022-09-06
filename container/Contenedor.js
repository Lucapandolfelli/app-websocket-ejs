import knex from "knex";

class Contenedor {
  constructor(config, table) {
    this.knex = knex(config);
    this.table = table;
  }

  async save(element) {
    try {
      return this.knex.insert(element).into(this.table);
    } catch (err) {
      return err;
    }
  }

  async getAll() {
    try {
      return this.knex.select("*").from(this.table);
    } catch (err) {
      return err;
    }
  }
}

export default Contenedor;
