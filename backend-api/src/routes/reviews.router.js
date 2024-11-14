const express = require('express');
const reviewsController = require('../controllers/reviews.controller');
const { methodNotAllowed } = require('../controllers/errors.controller')

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/reviews', router);

    /**
     * @swagger
     * /api/v1/reviews/{recipe_id}:
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
     *          - reviews
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
    router.post('/:recipe_id', reviewsController.rateAndCommentRecipe); 

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
    router.put('/:review_id', reviewsController.updateReview);

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