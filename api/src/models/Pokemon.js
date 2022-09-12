const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      },

    //Nombre 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://i.postimg.cc/ydrGgdVx/default.webp",
    },

    //Vida
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    //Ataque
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    //Defensa
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    //Velocidad
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    //Altura
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    //Peso
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

  }, {timestamps: false});
};