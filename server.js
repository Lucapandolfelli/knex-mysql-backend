const express = require("express");
const { options } = require("./options/mariaDB");
const knex = require("knex")(options);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/products", (req, res) => {
  knex("productos")
    .select("*")
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => res.status(500).end());
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  knex("productos")
    .select("*")
    .where("id", id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(500).end());
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  knex("productos")
    .insert(newProduct)
    .then(() => {
      res.status(201).json({ newProduct: newProduct });
    })
    .catch((err) => res.status(500).end());
});

app.delete("/products", (req, res) => {
  knex("productos")
    .del()
    .then(() => {
      res.status(200).send("Productos eliminados correctamente.");
    })
    .catch((err) => res.status(500).end());
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  knex("productos")
    .where("id", id)
    .del()
    .then(() => {
      res.status(200).send("Producto eliminado correctamente.");
    })
    .catch((err) => res.status(500).end());
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
