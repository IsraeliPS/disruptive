const schemaElements = (sequelize, type) => {
  const Elements = sequelize.define(
    'element',
    {
      elementId: {
        type: type.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      concept: {
        type: type.STRING(30),
        allowNull: false,
      },
      link: {
        type: type.STRING(200),
        allowNull: false,
      },
      typeElement: {
        type: type.STRING(10),
        allowNull: false,
      },
      userId: {
        type: type.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userId',
        },
      },
      tematicaId: {
        type: type.UUID,
        allowNull: false,
        references: {
          model: 'tematicas',
          key: 'tematicaId',
        },
      },
    },
    {
      timestamps: true,
    }
  );
  return Elements;
};

module.exports = schemaElements;
