const schemaTematicas = (sequelize, type) => {
  const Tematicas = sequelize.define(
    'tematicas',
    {
      tematicaId: {
        type: type.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      concept: {
        type: type.STRING(30),
        allowNull: false,
        unique: true,
      },
      linkImageCategory: {
        type: type.STRING(200),
        allowNull: false,
      },
      images: {
        type: type.BOOLEAN,
        allowNull: false,
      },
      videos: {
        type: type.BOOLEAN,
        allowNull: false,
      },
      texto: {
        type: type.BOOLEAN,
        allowNull: false,
      },
      createdBy: {
        type: type.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Tematicas;
};

module.exports = schemaTematicas;
