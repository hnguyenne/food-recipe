const express = require('express');
const accountController = require('../controllers/account.controller');
const imgUpload = require('../middlewares/img-upload.middleware');
const { methodNotAllowed } = require('../controllers/errors.controller')
const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/users', router);
    
    /**
     * @swagger
     * /api/v1/users/register:  
     *  post:
     *      summary: Create a new account
     *      description: Create new account
     *      requestBody:
     *          required: true
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      $ref: '#/components/schemas/User'
     *      tags:
     *          - users
     *      responses:
     *          201:
     *              description: A new account
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
     *                                      User:
     *                                          $ref: '#/components/schemas/User'
     *          400:
     *              description: Invalid input
     *          500:
     *              description: Internal server error
     *  
     */     
    router.post('/register', imgUpload, accountController.register)


    /**
     * @swagger
     * /api/v1/users/login:
     *  post:
     *      summary: Login an account
     *      description: Login an account
     *      parameters:
     *          - in: query
     *            name: token_id
     *            schema:
     *              type: integer
     *      tags: 
     *          - users
     *      responses:
     *          200:
     *              description: login successfully
     *          400:
     *              description: login information is invalid
     *          500:
     *              description: Internal server error
     * 
     */
    router.post('/login', accountController.login);

    /**
     * @swagger
     * /api/v1/users/{id}:
     *  get:
     *      summary: Get profile by ID
     *      description: Get user profile by user ID
     *      parameters:
     *          - $ref: '#/components/parameters/userIdParam'
     *      tags:
     *          - users
     *      responses:
     *          200:
     *              description: A user profile
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
     *                                      user:
     *                                          $ref: '#/components/schemas/User'
     *          404:
     *              description: Profile not found
     *          500:
     *              description: Internal server error
     */
    router.get('/:profile_id', accountController.getProfile);

    /**
     * @swagger
     * /api/v1/users/{id}:
     *  put:
     *      summary: Update account by ID
     *      description: Update an account's information using ID
     *      parameters:
     *          - $ref: '#/components/parameters/userIdParam'
     *      requestBody:
     *          content:
     *              multipart/form-data:
     *                  schema:
     *                      $ref: '#/components/schemas/User'
     *      tags:
     *          - users
     *      responses:
     *          200: 
     *              description: An updated account
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
     *                                      user:
     *                                          $ref: '#/components/schemas/User'
     *          400:
     *              description: Invalid request parameters    
     *          404:
     *              description: User not found
     *          500:
     *              description: Internal server error                  
     */
    router.put('/:profile_id', imgUpload, accountController.updateAccount);

    /**
     * @swagger
     * /api/v1/user/logout/{id}:
     *  delete:
     *      summary: Delete an account token for log out
     *      description: Delete an account token for log out using ID
     *      parameters:
     *          - $ref: '#/components/parameters/userIdParam'
     *      tags:
     *          - users
     *      responses:
     *          200:
     *              description: Account logged out
     *          500:
     *              description: Internal server error
     */
    router.delete('/logout/:profile_id', accountController.logout);

    router.all('/', methodNotAllowed);
    router.all('/:profile_id', methodNotAllowed);

};