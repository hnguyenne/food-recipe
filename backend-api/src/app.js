const express = require('express');
const cors = require('cors');

const recipesRouter = require('./routes/recipes.router');
const { specs, swaggerUi } = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json({
        message: 'OK'
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

recipesRouter.setup(app);

module.exports = app;