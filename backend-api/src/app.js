const express = require('express');
const cors = require('cors');
const JSend = require('./jsend');

const recipesRouter = require('./routes/recipes.router');
const { specs, swaggerUi } = require('./docs/swagger');
const {
    resourceNotFound,
    handleError
} = require('./controllers/errors.controller')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json(JSend.success());
});

app.use('/public', express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(resourceNotFound);
app.use(handleError);
recipesRouter.setup(app);

module.exports = app;