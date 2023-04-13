const { app, port } = require('./src/server');
const { sequelize } = require('./src/lib/db');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Listening on port: http://localhost:${port}`);
});
