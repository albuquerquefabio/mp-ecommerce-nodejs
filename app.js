const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

(async function run() {
  // Express
  await require('./src/lib/express').index(app);
  await require('./src/lib/express/client').default(app);
  await require('./src/api/create-reference').route(app);
  await require('./src/api/feedback').route(app);

  app.listen(port, () => console.log(`Server --> http://localhost:${port}`));
})();
