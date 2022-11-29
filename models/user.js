"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,

        allowNull: false,

        validate: {
          notNull: {
            msg: "Por favor introduce tu nombre",
          },
        },
      },
      surname: {
        type: DataTypes.STRING,

        allowNull: false,

        validate: {
          notNull: {
            msg: "Por favor, introduce tu apellido",
          },
        },
      },
      email: {
        type: DataTypes.STRING,

        allowNull: false,

        validate: {
          notNull: {
            msg: "Por favor, introduce tu email",
          },

          isEmail: {
            msg: "Tiene que ser un email válido",
          },
        },
      },
      role: DataTypes.STRING,
      gender: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
