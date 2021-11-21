const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const methodOverride = require('method-override');

exports.index = async (app) => {
  try {
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(compression());
    app.use(methodOverride());
    app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
    app.use(cors({ origin: true }));
  } catch (error) {
    console.log('Error Express Index ---\n', `${error}`);
  }
};
