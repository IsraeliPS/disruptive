const uuid = require('uuid');

const { TematicasModel, ElementModel } = require('../lib/db');

const create = async (tematicData) => {
  const { concept, images, videos, texto, userId, linkImageCategory } =
    tematicData;
  const id = uuid.v4();
  const text = concept.toUpperCase();

  return (newTematic = await TematicasModel.create({
    tematicaId: id,
    concept: text,
    images,
    videos,
    texto,
    createdBy: userId,
    linkImageCategory,
  }));
};

const update = async (tematicData) => {
  const {
    tematicaId,
    concept,
    images,
    videos,
    texto,
    userId,
    linkImageCategory,
  } = tematicData;
  const operation = await TematicasModel.update(
    {
      concept: concept.toUpperCase(),
      images,
      videos,
      texto,
      userId,
      linkImageCategory,
    },
    {
      where: { tematicaId },
    }
  );
  return operation;
};

const getAll = async () => {
  return await TematicasModel.findAll({});
};

const getByConcept = async (concept) => {
  return await TematicasModel.findOne({
    where: { concept },
  });
};

const deleteTem = async (concept) => {
  return await TematicasModel.destroy({
    where: { concept },
  });
};

module.exports = {
  create,
  update,
  deleteTem,
  getAll,
  getByConcept,
};
