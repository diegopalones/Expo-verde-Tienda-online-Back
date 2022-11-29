const { Category, Sequelize, Product } = require("../models/index.js");
const {Op} = Sequelize

const CategoryController = {
  
  create(req, res) {
    console.log(req.body)
    Category.create(req.body)

      .then((user) =>
        res.status(201).send({ message: "Categoria creada con éxito", Category })
      )

      .catch(console.error);
  },
  async updateCategory(req, res) {
    try {
      await Category.update({name:req.body.name}, {
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Categoria actualizada con éxito" });
    } catch (error) {
      console.error(err);
      res
        .status(500)
        .send({ msg: "Hubo un error al actualizar la categoria", Category });
    }
  },

  async deleteCategory(req, res) {
    try {
      await Category.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ msg: "Categoria explotada con éxito" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Ups, hubo un error al reventar la categoria", Category });
    }
  },
  
  getAllCategories(req, res) {
    Category.findAll()
      .then((categories) => res.send(categories))
      .catch((err) => {
        console.error(err);
        res.status(500).send({message: "Hubo un problema al traer las categorias"});
      });
  },

  async getCategoryById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id, {
      });
      res.send(category);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Hubo un error al obtener la categoria", error });
    }
  },

  async getCategoryByName(req, res) {
    try {
      const category = await Category.findOne({
        where: {
          name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      });
      res.send(category);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ msg: "Hubo un error al buscar la categoría", err });
    }
  },



async getCategoriesAndProducts(req, res) {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product, attributes: ["name","price"] }],
    });
    res.send({ msg: "Tus categorias y tus productos", categories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error el traer categorias y productos", error });
  }}

};
module.exports = CategoryController;