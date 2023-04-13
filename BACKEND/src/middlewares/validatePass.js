const tematicas = require('../usecases/tematicasUseCases');

const validatePass = async (req, res, next) => {
  try {
    const concept = await tematicas.getByConcept(
      req.body.tematica.toUpperCase()
    );
    if (concept === null) {
      res.status(400).json({
        success: false,
        message: 'Concept not exist',
      });
    } else {
      switch (req.url) {
        case '/video':
          if (concept._previousDataValues.videos) {
            req.validatePass = true;
          } else {
            req.validatePass = false;
          }

          break;

        case '/text':
          if (concept._previousDataValues.texto) {
            req.validatePass = true;
          } else {
            req.validatePass = false;
          }

          break;

        case '/image':
          if (concept._previousDataValues.images) {
            req.validatePass = true;
          } else {
            req.validatePass = false;
          }
          break;
        default:
          req.validatePass = false;
          break;
      }
    }
    next();
  } catch (err) {
    console.log('error', error);
    res.status(400).json({
      success: false,
      message: 'Error validate pass',
    });
  }
};

module.exports = validatePass;
