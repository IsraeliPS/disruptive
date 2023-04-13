const Sequelize = require('sequelize');
const mysql = require('mysql2');

const { db } = require('./config');
const { user, password, host, name, port } = db;

// const { schemaElements, schemaTematicas, schemaUsers } = require('../models');
const schemaUsers = require('../models/Users');
const schemaTematicas = require('../models/Tematicas');
const schemaElements = require('../models/Elements');

const connection = mysql.createConnection({ host, port, user, password });

connection.query(`CREATE DATABASE IF NOT EXISTS ${name};`);

const DBURL = `mysql://${user}:${password}@${host}/${name}`;
const sequelize = new Sequelize(DBURL);

const UserModel = schemaUsers(sequelize, Sequelize);
const TematicasModel = schemaTematicas(sequelize, Sequelize);
const ElementModel = schemaElements(sequelize, Sequelize);

UserModel.hasMany(ElementModel, { foreignKey: 'userId' });
ElementModel.belongsTo(UserModel, { foreignKey: 'userId' });

TematicasModel.hasMany(ElementModel, { foreignKey: 'tematicaId' });
ElementModel.belongsTo(TematicasModel, { foreignKey: 'tematicaId' });

sequelize
  .sync()
  .then(() => {
    console.log('Tables created successfully');
    console.log('*------------------------------------------*');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  UserModel,
  TematicasModel,
  ElementModel,
  sequelize,
};
