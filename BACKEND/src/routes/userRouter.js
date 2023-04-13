const express = require('express');
const user = require('../usecases/userUseCases');
const { esAdminRole, tieneRole } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  [tieneRole('ADMIN_ROLE', 'LECTOR_ROLE', 'CREATOR_ROLE')],
  async (req, res) => {
    try {
      const userData = req.body;
      const userCreated = await user.create(userData);

      const { userId } = userCreated;
      res.status(201).json({
        success: true,
        message: 'User Created successfully',
        payload: { userId },
      });
    } catch (err) {
      if (err.parent.sqlState === '23000') {
        res.status(401).json({
          success: false,
          message: 'User already exists',
        });
      }
    }
  }
);

router.get('/', [esAdminRole], async (res, next) => {
  try {
    const usersData = await user.getAll();
    res.status(200).json({
      success: true,
      payload: usersData,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
