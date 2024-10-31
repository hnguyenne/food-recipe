const express = require('express');
const cors = require('cors');
const JSend = require('./jsend');

const recipesRouter = require('./routes/recipes.router');
const accountsRouter = require('./routes/accounts.router');
const reviewsRouter = require('./routes/reviews.router');
const { specs, swaggerUi } = require('./docs/swagger');
const {
    handleError
} = require('./controllers/errors.controller')
const app = express();
const session = require('express-session');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json(JSend.success());
});

app.use('/public', express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(session({
    secret: '1234567890',
    resave: false,
    saveUninitialized: false,
    secure: false, //http
    cookie: {maxAge: 60000}
}))

recipesRouter.setup(app);
accountsRouter.setup(app);
reviewsRouter.setup(app);

app.use(handleError);

module.exports = app;