require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const supplierRoutes = require('./routes/suppliers');
const productRoutes = require('./routes/products');
const indexRoutes = require('./routes/index');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middleware set default title
app.use((req, res, next) => {
  res.locals.title = 'Part App';
  next();
});
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/partdb')
  .then(()=> console.log('Mongo connected'))
  .catch(err=> console.error(err));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret123',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/partdb' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// expose user to views
app.use((req, res, next)=>{
  res.locals.currentUser = req.session.user || null;
  next();
});

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
app.listen(PORT, () => console.log(`Swagger running on http://localhost:${PORT}/api-docs`));
