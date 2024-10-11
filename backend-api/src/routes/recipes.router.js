const express = require('express');
const recipesController = require('../controllers/recipes.controller');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/foodrecipe', router);

    /**
     * @swagger
     * /api/v1/foodrecipe/latest:
     *      get:
     *          summary: Get the latest recipes
     *          description: Retrieves a list of the latest recipes based on creation date.
     *          parameters:
     *              - in: query
     *                name: page
     *                description: Page number for pagination
     *                schema:
     *                  type: integer
     *                  default: 1
     *              - in: query
     *                name: limit
     *                description: Number of recipes per page
     *                schema:
     *                  type: integer
     *                  default: 10
     *          responses:
     *              200:
     *                  description: List of latest recipes
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  data:
     *                                      type: array
     *                                      items:
     *                                          $ref: '#/components/schemas/Recipe'
     *                                  pagination:
     *                                      type: object
     *                                      properties:
     *                                          page:
     *                                              type: integer
     *                                          limit:
     *                                              type: integer
     *                                          totalPages:
     *                                              type: integer
     *                                          totalRecords:
     *                                              type: integer
     *              400:
     *                  description: Invalid request parameters
     *              500:
     *                  description: Internal server error
     */
    router.get('/latest', recipesController.getLatestRecipes);

    /**
     * @swagger
     * /api/v1/foodrecipe/popular:
     *  get:
     *      summary: Get the most popular recipes
     *      description: Retrieves a list of the most popular recipes based on rate.
     *      parameters:
     *          - in: query
     *            name: page
     *            description: Page number for pagination
     *            schema:
     *              type: integer
     *              default: 1
     *          - in: query
     *            name: limit
     *            description: Number of recipes per page
     *            schema:
     *              type: integer
     *              default: 10
     *      responses:
     *          200:
     *              description: List of the most popular recipes
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              data:
     *                                  type: array
     *                                  items:
     *                                      $ref: '#/components/schemas/Recipe'
     *                              pagination:
     *                                  type: object
     *                                  properties:
     *                                      page:
     *                                          type: integer
     *                                      limit:
     *                                          type: integer
     *                                      totalPages:
     *                                          type: integer
     *                                      totalRecords:
     *                                          type: integer
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/popular', recipesController.getPopularRecipes);

    /**
     * @swagger
     * /api/v1/foodrecipe:
     *  get:
     *      summary: Get recipes by filters:
     *      description: Retrieves a list of recipes based on filter.
     *      parameters:
     *          - in: query
     *            name: title
     *            description: title of recipes
     *            schema:
     *              type: string
     *          - in: query
     *            name: tag
     *            description: tag of recipe like seasons, holiday, nation,...
     *            schema:
     *              type: string
     *          - in: query
     *            name: description
     *            description: type of cook method, ingredients stored in recipe description
     *            schema:
     *              type: string
     *          - in: query
     *            name: page
     *            description: Page number for pagination
     *            schema:
     *              type: integer
     *              default: 1
     *          - in: query
     *            name: limit
     *            description: Number of recipes per page
     *            schema:
     *              type: integer
     *              default: 10
     *      responses:
     *          200:
     *              description: List of recipes match filter
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              data:
     *                                  type: array
     *                                  items:
     *                                      $ref: '#/components/schemas/Recipe'
     *                              pagination:
     *                                  type: object
     *                                  properties:
     *                                      page:
     *                                          type: integer
     *                                      limit:
     *                                          type: integer
     *                                      totalPages:
     *                                          type: integer
     *                                      totalRecords:
     *                                          type: integer
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/', recipesController.getRecipeByFilter);

    router.get('/:id', recipesController.getRecipeById);
    router.post('/', recipesController.addRecipe);
    router.put('/:id', recipesController.updateRecipe);
    
    router.put('/save/:id', recipesController.saveRecipe);
    router.post('/review/:id', recipesController.rateAndCommentRecipe); 
    router.put('/like/:id', recipesController.likeComment);

    router.get('/avg:id', recipesController.getAvgRate);
    router.get('/review:id', recipesController.getComments);
};