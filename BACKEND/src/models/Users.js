const schemaUsers = (sequelize, type) => {
  const Users = sequelize.define(
    'users',
    {
      userId: {
        type: type.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        required: [true, 'El uuid es obligatorio'],
      },
      username: {
        type: type.STRING(30),
        allowNull: false,
        unique: true,
        required: [true, 'El usuario es obligatorio'],
      },
      email: {
        type: type.STRING(50),
        allowNull: false,
        require: true,
        isEmail: true,
        unique: true,
        required: [true, 'El email es obligatorio'],
      },
      password: {
        type: type.STRING(80),
        allowNull: false,
        require: true,
        required: [true, 'El password es obligatorio'],
      },
      role: {
        type: type.STRING(12),
        allowNull: false,
        required: [true, 'El role es obligatorio'],
        defaultValue: 'LECTOR_ROLE',
        enum: ['ADMIN_ROLE', 'LECTOR_ROLE', 'CREATOR_ROLE'],
      },
    },
    {
      timestamps: true,
    }
  );
  return Users;
};

module.exports = schemaUsers;
