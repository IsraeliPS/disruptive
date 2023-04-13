const express = require('express');
const auth = require('../middlewares/auth');
const tematicas = require('../usecases/tematicasUseCases');

const { validateImage } = require('../middlewares');
const { esAdminRole } = require('../middlewares/esAdminRole');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const concepts = await tematicas.getAll();
    res.status(200).json({
      success: true,
      payload: concepts,
    });
  } catch (err) {
    console.log('tematic', err);
    if (err.parent.sqlState === '23000')
      res.status(401).json({
        success: false,
        message: 'Concept already exists',
      });
    else
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
  }
});

router.post('/', [auth, esAdminRole, validateImage()], async (req, res) => {
  try {
    const { userId } = req.user;
    const linkImageCategory =
      'http://localhost:3000/static/images/' + req.file.filename;
    const tematicData = { ...req.body, userId, linkImageCategory };
    const conceptCreated = await tematicas.create(tematicData);

    res.status(201).json({
      success: true,
      message: 'Concept created successfully',
      payload: conceptCreated,
    });
  } catch (err) {
    console.log('tematic', err);
    if (err.parent.sqlState === '23000')
      res.status(401).json({
        success: false,
        message: 'Concept already exists',
      });
    else
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
  }
});

router.patch(
  '/',
  [auth, esAdminRole, validateImage()],
  async (req, res, next) => {
    try {
      const { userId } = req.user;

      const conceptId = await tematicas.getByConcept(
        req.body.concept.toUpperCase()
      );

      if (conceptId === null) {
        res.status(400).json({
          success: false,
          message: 'Concept not exist',
        });
      } else {
        const tematicaId = conceptId.dataValues.tematicaId;
        const linkImageCategory =
          'http://localhost:3000/static/images/' + req.file.filename;
        const tematicData = {
          tematicaId,
          ...req.body,
          userId,
          linkImageCategory,
        };

        const conceptUpdated = await tematicas.update(tematicData);

        
        res.status(200).json({
          success: true,
          message: 'Concept Updated successfully',
        });
      }
    } catch (err) {
      if (err?.parent?.sqlState === '23000')
        res.status(401).json({
          success: false,
          message: 'Concept already exists',
        });
      else
        res.status(500).json({
          success: false,
          message: 'Server Error',
        });
    }
  }
);

router.delete('/', [auth, esAdminRole], async (req, res, next) => {
  try {
    const concept = req.body.concept.toUpperCase();
    const conceptId = await tematicas.getByConcept(concept);

    if (conceptId === null) {
      res.status(400).json({
        success: false,
        message: 'Concept not exist',
      });
    } else {
      await tematicas.deleteTem(concept);
      res.status(200).json({
        success: true,
        message: 'Concept deleted successfully',
      });
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
});

module.exports = router;
