const uuid = require('uuid');

const { UserModel } = require('../lib/db');
// const { Operation } = require('../lib/db')
const jwt = require('../lib/jwt');

const { hashPassword, verifyPassword } = require('../lib/crypt');

const create = async (dataUser) => {
  const { username, email, password, role } = dataUser;
  const id = uuid.v4();
  const name = username.toLowerCase();
  const mail = email.toLowerCase();

  const hash = await hashPassword(password);
  const user = await UserModel.create({
    userId: id,
    username: name,
    email: mail,
    password: hash,
    role,
  });

  return user;
};

const getAll = async () => {
  return await UserModel.findAll({
    attributes: { exclude: ['password'] },
  });
};

const getByEmail = async (email) => {
  return await UserModel.findOne({
    where: { email: email },
  });
};

const logIn = async (email, password) => {
  try {
    const user = await getByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Password invalid');
    }

    const token = await jwt.sign({
      userId: user.dataValues.userId,
      username: user.dataValues.username,
      role: user.dataValues.role,
    });

    return {
      userId: user.dataValues.userId,
      username: user.dataValues.username,
      role: user.dataValues.role,
      token,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getAll,
  logIn,
};
