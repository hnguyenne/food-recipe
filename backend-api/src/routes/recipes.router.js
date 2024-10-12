const express = require('express');
const recipesController = require('../controllers/recipes.controller');
const imgUpload = require('../middlewares/img-upload.middleware');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/foodrecipe', router);

    /**
     * @swagger
     * /api/v1/foodrecipe/latest:
     *  get:
     *      summary: Get the latest recipes
     *      description: Retrieves a list of the latest recipes based on creation date.
     *      parameters:
     *          - $ref: '#/components/parameters/limitParam'
     *          - $ref: '#/components/parameters/pageParam'
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: A list of latest recipes
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipes:
     *                                          type: array
     *                                          items:
     *                                              $ref: '#/components/schemas/Recipe'
     *                                      metadata:
     *                                          $ref: '#/components/schemas/PaginationMetadata'
     * 
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/latest', recipesController.getLatestRecipes);

    /**
     * @swagger
     * /api/v1/foodrecipe/popular:
     *  get:
     *      summary: Get the most popular recipes
     *      description: Retrieves a list of the most popular recipes based on rate.
     *      parameters:
     *          - $ref: '#/components/parameters/limitParam'
     *          - $ref: '#/components/parameters/pageParam'
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: A list of popular recipes
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipes:
     *                                          type: array
     *                                          items:
     *                                              $ref: '#/components/schemas/Recipe'
     *                                      metadata:
     *                                          $ref: '#/components/schemas/PaginationMetadata'
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
     *      summary: Get recipes by filters
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
     *          - $ref: '#/components/parameters/limitParam'
     *          - $ref: '#/components/parameters/pageParam'
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: A list of recipes that match filter
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipes:
     *                                          type: array
     *                                          items:
     *                                              $ref: '#/components/schemas/Recipe'
     *                                      metadata:
     *                                          $ref: '#/components/schemas/PaginationMetadata'
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/', recipesController.getRecipeByFilter);

    /**
     * @swagger
     * /api/v1/foodrecipe/{recipe_id}:
     *  get:
     *      summary: Get recipes by id
     *      description: Retrieves recipe information by id
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            description: ID of the recipe
     *            required: true
     *            schema:
     *              type: integer
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: recipe information
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Recipe'                
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/:recipe_id', recipesController.getRecipeById);

    /**
     * @swagger
     * /api/v1/foodrecipe:
     *  post:
     *      summary: Add a new recipe
     *      description: Adds a new recipe to the database.
     *      requestBody:
     *          required: true
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      $ref: '#/components/schemas/Recipe'
     *      tags:
     *          - recipes
     *      responses:
     *          201:
     *              description: Recipe created successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipe:
     *                                          $ref: '#/components/schemas/Recipe'
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.post('/', imgUpload, recipesController.addRecipe);

    /**
     * @swagger
     * /api/v1/foodrecipe/{recipe_id}:
     *  put:
     *      summary: Update a recipe by id
     *      description: Update a recipe by id
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            required: true
     *            description: The id of the recipe to update
     *            schema:
     *              type: integer
     *      requestBody:
     *          required: true
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      $ref: '#/components/schemas/Recipe'
     *      tags:
     *          - recipes
     *      response:
     *          201:
     *              description: Recipe updated successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipe:
     *                                          $ref: '#/components/schemas/Recipe'
     *          404:
     *              description: Recipe not found
     *          500:
     *              description: Internal server error
     */
    router.put('/:recipe_id', recipesController.updateRecipe);
    
    /**
     * @swagger
     * /api/v1/foodrecipe/save/{recipe_id}:
     *  put:
     *      summary: Save a recipe by recipe_id
     *      description: Save a recipe by id. This is used to mark a recipe as saved for future reference.
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            description: ID of the recipe
     *            required: true
     *            schema:
     *              type: integer
     *          - in: query
     *            name: user_id
     *            description: ID of the user
     *            required: true
     *            schema:
     *              type: integer
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: Recipe saved successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      recipe:
     *                                          $ref: '#/components/schemas/Recipe'     
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.post('/save/:recipe_id', recipesController.saveRecipe);

    /**
     * @swagger
     * /api/v1/foodrecipe/review/{recipe_id}:
     *  post:
     *      summary: Review a recipe
     *      description: review a recipe by recipe_id
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            description: ID of recipe
     *            required: true
     *            schema:
     *              type: integer
     *          - in: query
     *            name: user_id
     *            description: ID of user
     *            required: true
     *            schema:
     *              type: integer
     *          - in: query
     *            name: rate
     *            description: Rate of the recipe
     *            required: true
     *            schema:
     *              type: integer
     *              minimum: 1
     *              maximum: 5, default
     *          - in: query
     *            name: comment
     *            description: Comment part of the review of recipe
     *            schema:
     *              type: string
     *      tags:
     *          - recipes
     *      responses:
     *          201:
     *              description: post review recipe successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      review:
     *                                          $ref: '#/components/schemas/Review'
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.post('/review/:recipe_id', recipesController.rateAndCommentRecipe); 

    /**
     * @swagger
     * /api/v1/foodrecipe/like/{review_id}:
     *  post:
     *      summary: Like a comment
     *      description: Like a comment of a recipe by review ID
     *      parameters:
     *          - in: path
     *            name: review_id
     *            description: ID of the review
     *            required: true
     *            schema:
     *              type: integer
     *          - in: query
     *            name: user_id
     *            description: ID of user who like the review
     *            required: true
     *            schema:
     *              type: integer
     *      tags:
     *          - recipes
     *      response:
     *          200:
     *              description: Like review successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      comment:
     *                                          $ref: '#/components/schemas/Review'
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.post('/like/:review_id', recipesController.likeComment);

    /**
     * @swagger
     * /api/v1/foodrecipe/avg/{recipe_id}:
     *  get:
     *      summary: Get average rating of a recipe
     *      description: Get average rating of a recipe
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            description: id of the recipe
     *            required: true
     *            schema:
     *              type: integer
     *      tags:
     *          - recipes
     *      response:
     *          200:
     *              description: rating of the recipe retrieved successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: float
     *                                  description: average rate of recipe
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/avg:recipe_id', recipesController.getAvgRate);

    /**
     * @swagger
     * /api/v1/foodrecipe/review/{recipe_id}:
     *  get:
     *      summary: Get comments of a recipe
     *      description: Get reviews of a recipe with recipe id
     *      parameter:
     *          - in: path
     *            name: recipe_id
     *            description: Id of the recipe
     *            schema:
     *              type: integer    
     *          - $ref: '#/components/parameters/limitParam'
     *          - $ref: '#/components/parameters/pageParam'
     *      tags:
     *          - recipes
     *      responses:
     *          200:
     *              description: A list of reviews of recipe
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: string
     *                                  description: The response status
     *                                  enum: [success]
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      reviews:
     *                                          type: array
     *                                          items:
     *                                              $ref: '#/components/schemas/Review'
     *                                      metadata:
     *                                          $ref: '#/components/schemas/PaginationMetadata'
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/review:recipe_id', recipesController.getComments);
};