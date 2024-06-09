const app = require(`./config/config`);
require(`./app/tareas`)(app);
require(`./app/usuario`)(app);

const port = 3000;

app.listen(port, () =>
  console.log(`servidor ejecutandonse en el puerto ${port}`)
);
