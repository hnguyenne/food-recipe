const express = require('express');
const reviewsController = require('../controllers/reviews.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const multer = require('multer');
const upload = multer();

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/reviews', router);

    /**
     * @swagger
     * /api/v1/reviews:
     *  post:
     *      summary: Review a recipe
     *      description: review a recipe by recipe_id
     *      requestBody:
     *          required: true
     *          content: 
     *              multipart/form-data:
     *                  schema:
     *                      $ref: '#/components/schemas/Review'
     *      tags:
     *          - reviews
     *      responses:
     *          200:
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
    router.post('/', upload.none() ,reviewsController.rateAndCommentRecipe); 

    /**
     * @swagger
     * /api/v1/reviews:
     *  get:
     *      summary: get user'review
     *      description: get review by recipe_id and user_id
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            description: recipe id
     *            schema:
     *              type: integer
     *          - in: path
     *            name: user_id
     *            description: user id
     *            schema:
     *              type: integer
     *      tags:
     *          - reviews
     *      responses:
     *          200:
     *              description: get user's review of this recipe successfully
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
    router.get('/:recipe_id/:user_id',reviewsController.getUserReview); 

    /**
     * @swagger
     * /api/v1/reviews/{recipe_id}:
     *  get:
     *      summary: Get comments of a recipe
     *      description: Get reviews of a recipe with recipe id
     *      parameters:
     *          - in: path
     *            name: recipe_id
     *            description: Id of the recipe
     *            schema:
     *              type: integer  
     *      tags:
     *          - reviews
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
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.get('/:recipe_id', reviewsController.getComments);

    /**
     * @swagger
     * /api/v1/reviews/{review_id}:
     *  put:
     *      summary: Update a review
     *      description: Update a review
     *      parameters:
     *          - in: path
     *            name: review_id
     *            description: id of the review
     *            schema:
     *              type: integer
     *      requestBody:
     *          required: true
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      $ref: '#/components/schemas/Review'
     *      tags:
     *          - reviews
     *      responses:
     *          200:
     *              description: Review updated successfully
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Review'
     *          400:
     *              description: Invalid request parameters
     *          500:
     *              description: Internal server error
     */
    router.put('/:review_id', upload.none(), reviewsController.updateReview);

    /**
     * @swagger
     * /api/v1/reviews/{review_id}:
     *  delete:
     *      summary: Delete a review
     *      description: Delete a review by its id
     *      parameters:
     *          - in: path
     *            name: review_id
     *            description: id of the review to delete
     *            schema:
     *              type: integer
     *      tags:
     *          - reviews
     *      responses:
     *          200:
     *              description: review deleted successfully
     *          500:
     *              description: Internal server error
     */
    router.delete('/:review_id', reviewsController.deleteReview);
    
    router.all('/', methodNotAllowed);
    router.all('/:recipe_id', methodNotAllowed);
};