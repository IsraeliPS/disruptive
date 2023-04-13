const uuid = require('uuid');

const { ElementModel, TematicasModel } = require('../lib/db');

const create = async (elementData) => {
  const { link, userId, tematicaId, concept, typeElement } = elementData;
  const id = uuid.v4();
  try {
    const newElement = await ElementModel.create({
      link,
      userId,
      tematicaId,
      typeElement,
      concept,
      elementId: id,
    });
    return newElement;
  } catch (err) {
    console.log(err);
  }
};

const getAllMedia = async (concept) => {
  let newVideo = [],
    newTexto = [],
    newImagen = [],
    allData = {};
  const tematicas = await TematicasModel.findOne({
    where: { concept },
  });
  const id = tematicas.dataValues.tematicaId;
  const videos = await ElementModel.findAll({
    where: { tematicaId: id, typeElement: 'video' },
  });
  const texto = await ElementModel.findAll({
    where: { tematicaId: id, typeElement: 'texto' },
  });
  const images = await ElementModel.findAll({
    where: { tematicaId: id, typeElement: 'imagen' },
  });
  const respVideos = videos.map((video) => video.dataValues);
  const respImagen = images.map((imagen) => imagen.dataValues);
  const respTexto = texto.map((file) => file.dataValues);
  allData = {
    videos: respVideos,
    images: respImagen,
    texto: respTexto,
  };
  return allData;
};

module.exports = {
  create,
  getAllMedia,
  // update,
  // deleteTem,
  // getByConcept,
};
