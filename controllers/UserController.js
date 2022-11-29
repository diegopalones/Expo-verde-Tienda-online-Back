const { User, Order,Product,Token, Sequelize } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const { Op } = Sequelize;

const UserController = {
  async create(req, res, next) {
    try {
      req.body.role = "user";
      const password = await bcrypt.hash(
        req.body.password ? req.body.password : "",
        10
      );
      const user = await User.create({ ...req.body, password });
      res.status(201).send({ msg: "Usuario creado satisfactoriamente", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }

      const isMatch = bcrypt.compareSync(req.body.password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });

      res.send({ message: "Bienvenido " + user.name, user, token });
    });
  },

  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });

      res.send({ message: "Desconectado satisfactoriamente" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Ha habido un problema con el logout" });
    }
  },

  async getUserWithOrderById(req, res) {
    try {
      const users = await User.findByPk(req.user.id,{
        attributes: { exclude: ["password", "role", "createdAt", "updatedAt"] },
        include: [
          {
            model: Order,
            attributes: ["id", "date","status"],
            include: [
              {
                model: Product,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
          
        ],
        
      });
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "No hemos podido ayudarte con la solicitud", error });
    }
  },
   

};





module.exports = UserController;
