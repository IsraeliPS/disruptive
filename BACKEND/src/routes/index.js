const userRouter = require('./userRouter');
const tematicasRouter = require('./tematicasRouter');
const authRouter = require('./authRouter');
const elementsRouter = require('./elementsRouter');

const apiRouter = (app) => {
  app.use('/user', userRouter);
  app.use('/tematica', tematicasRouter);
  app.use('/element', elementsRouter);
  app.use('/auth', authRouter);
};

module.exports = apiRouter;
