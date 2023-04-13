const express = require('express');
const router = express.Router();

const user = require('../usecases/userUseCases');
const { auth } = require('../middlewares');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await user.logIn(email, password);

    res.status(200).json({
      success: true,
      message: 'Login Succesful',
      payload: token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: 'Login Failed',
      error: error.message,
    });
    // res.status(401).json({
    //     success:false,
    //     message:error.message
    // })
  }
});

router.get('/token', auth, async (req, res, next) => {
  try {
    const userData = req.user;

    res.status(200).json({
      success: true,
      payload: userData,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
