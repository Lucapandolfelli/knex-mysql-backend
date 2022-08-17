const { options } = require("../options/mariaDB");
const knex = require("knex")(options);

class Contenedor {
  constructor(table) {
    this.table = table;
  }

  save(newProducto) {
    knex(this.table)
      .insert(newProducto)
      .then(() => true)
      .catch((err) => console.log(err));
  }

  getById(id) {
    knex
      .from(this.table)
      .select("*")
      .where({ id: id })
      .then((product) => product)
      .catch((err) => console.log(err));
  }

  async getAll() {
    knex
      .from(this.table)
      .select("*")
      .catch((err) => console.log(err));
  }

  /* async deleteById(id) {
    try {
      const obj = await this.getById(id);
      const data = await this.getAll();
      const newArray = data.filter((item) => item.id != obj.id);
      await fs.promises.writeFile(
        this.archive,
        JSON.stringify(newArray, null, 2)
      );
      console.log("Producto eliminado correctamente.");
    } catch (err) {
      console.log("El producto indicado ya se ha eliminado.");
    }
  }

  async deleteAll() {
    try {
      const data = await this.getAll();
      data.splice(0, data.length);
      await fs.promises.writeFile(this.archive, JSON.stringify(data, null, 2));
      console.log("Productos borrados corectamente.");
    } catch (err) {
      console.log(err);
    }
  } */
}

module.exports = new Contenedor("productos");
