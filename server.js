require('dotenv').config();
require('./config/passport/local-strategy.config')();
require('./config/passport/twitter-strategy.config')();

const express       = require('express');
const compression   = require('compression');
const helmet        = require('helmet');
const path          = require('path');
const session       = require('express-session');
const MongoStore    = require('connect-mongo')(session);
const cookieParer   = require('cookie-parser');
const cookiesConfig = require('./config/cookies.config');
const db            = require('./services/db.service');
const passport      = require('passport');
const flash         = require('connect-flash');
const minify        = require('express-minify');
const zlib          = require('zlib');

const app = express();

const routes = require('./routes/router');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());

app.use(cookieParer(process.env.SESS_SECRET));

if(app.get('env') === 'production') {
  app.set('trust proxy', 1);
  cookiesConfig['secure'] = true;
}

app.use(session({
  cookie: cookiesConfig,
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESS_SECRET,
  store: new MongoStore({mongooseConnection: db.connection})
}));

app.use(compression({
  level: zlib.Z_BEST_COMPRESSION,
  strategy: zlib.Z_DEFAULT_STRATEGY
}));
app.use(minify({
  cache: path.join(__dirname, 'cache')
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(routes);

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});
