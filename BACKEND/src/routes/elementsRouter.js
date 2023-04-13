const express = require('express');

const elements = require('../usecases/elementsUseCases');
const tematicas = require('../usecases/tematicasUseCases');
const {
  validateImage,
  validateText,
  auth,
  validatePass,
  tieneRole,
} = require('../middlewares');

const router = express.Router();

router.post('/', [auth], async (req, res, next) => {
  try {
    const concept = req.body.data;
    const allDataMedia = await elements.getAllMedia(concept);

    if (Object.values(allDataMedia).length > 0) {
      res.status(200).json({
        success: true,
        message: 'Element Created successfully',

        payload: { allDataMedia },
      });
    } else {
      res.status(400).json({
        success: true,
        message: 'Must be create more elements',
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: 'Error ' + err,
    });
  }
});

router.post(
  '/image',
  [
    validateImage(),
    auth,
    tieneRole('ADMIN_ROLE', 'CREATOR_ROLE'),
    validatePass,
  ],
  async (req, res, next) => {
    try {
      const conceptId = await tematicas.getByConcept(
        req.body.tematica.toUpperCase()
      );

      if (!req.validatePass) {
        res.status(400).json({
          success: false,
          message:
            'the category does not have permissions to enter multimedia of this type',
        });
        next();
      } else {
        const { userId } = req.user;
        const { concept } = req.body;

        const link = 'http://localhost:3000/static/images/' + req.file.filename;
        const elementData = {
          link,
          userId,
          typeElement: 'imagen',
          tematicaId: conceptId.tematicaId,
          concept,
        };
        const elementCreate = await elements.create(elementData);

        res.status(200).json({
          success: true,
          message: 'Element Created successfully',
          payload: { elementCreate },
        });
      }
      next();
    } catch (err) {
      if (err?.parent?.sqlState === '23000') {
        res.status(401).json({
          success: false,
          message: 'User already exists',
        });
      } else
        res.status(500).json({
          success: false,
          message: 'Server Error' + err,
        });
    }
  }
);

router.post(
  '/text',
  [validateText(), auth, tieneRole('ADMIN_ROLE', 'CREATOR_ROLE'), validatePass],
  async (req, res, next) => {
    try {
      const conceptId = await tematicas.getByConcept(
        req.body.tematica.toUpperCase()
      );

      if (!req.validatePass) {
        res.status(400).json({
          success: false,
          message:
            'the category does not have permissions to enter multimedia of this type',
        });
        next();
      } else {
        const { userId } = req.user;
        const { concept } = req.body;

        const link = 'http://localhost:3000/static/text/' + req.file.filename;
        const elementData = {
          link,
          userId,
          typeElement: 'texto',
          tematicaId: conceptId.tematicaId,
          concept,
        };
        const elementCreate = await elements.create(elementData);

        res.status(200).json({
          success: true,
          message: 'Element Created successfully',
          payload: { elementCreate },
        });
      }
      next();
    } catch (err) {
      if (err?.parent?.sqlState === '23000') {
        res.status(401).json({
          success: false,
          message: 'User already exists',
        });
      } else
        res.status(500).json({
          success: false,
          message: 'Server Error',
        });
    }
  }
);

router.post(
  '/video',
  [auth, tieneRole('ADMIN_ROLE', 'CREATOR_ROLE'), validatePass],
  async (req, res, next) => {
    try {
      const conceptId = await tematicas.getByConcept(
        req.body.tematica.toUpperCase()
      );

      if (!req.validatePass) {
        res.status(400).json({
          success: false,
          message:
            'the category does not have permissions to enter multimedia of this type',
        });
        next();
      } else {
        const { userId } = req.user;
        const { concept, link } = req.body;

        const elementData = {
          link,
          userId,
          typeElement: 'video',
          tematicaId: conceptId.tematicaId,
          concept,
        };
        const elementCreate = await elements.create(elementData);

        res.status(200).json({
          success: true,
          message: 'Element Created successfully',
          payload: { elementCreate },
        });
      }
      next();
    } catch (err) {
      if (err?.parent?.sqlState === '23000') {
        res.status(401).json({
          success: false,
          message: 'User already exists',
        });
      } else
        res.status(500).json({
          success: false,
          message: 'Server Error',
        });
    }
  }
);

module.exports = router;
