const express = require('express');
const cors = require('cors');

const recipesRouter = require('./routes/recipes.router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json({
        message: 'OK'
    });
});

recipesRouter.setup(app);

module.exports = app;