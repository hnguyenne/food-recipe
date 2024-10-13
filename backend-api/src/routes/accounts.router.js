const express = require('express');
const accountController = require('../controllers/account.controller');
const imgUpload = require('../middlewares/img-upload.middleware');
const { methodNotAllowed } = require('../controllers/errors.controller')
const router = express.Router();

module.exports.setup = (app) => {
    app.use('/account', router);
    
    /**
     * @swagger
     *  /api/v1/users:  
     *      post:
     *          summary: Create a new account
     *          description: Create new account
     *          requestedBody:
     *              required: true
     *              content:
     *                  multipart/form-data:
     *                      schema:
     *                          $ref: '#/components/schemas/User'
     *          tags:
     *              - users
     *          responses:
     *              201:
     *                  description: A new account
     *                  content:
     *                      application/json:
     *                          schema:
     *                              type: object
     *                              properties:
     *                                  status:
     *                                      type: string
     *                                      description: The response status
     *                                      enum: [success]
     *                                  data:
     *                                      type: object
     *                                      properties:
     *                                          User:
     *                                              $ref: '#/components/schemas/User'
     *              400:
     *                  description: Invalid input
     *              500:
     *                  description: Internal server error
     *  
     */     
    router.post('/register', accountController.register)

    router.post('/login', accountController.login);

    /**
     * @swagger
     *  /api/v1/users/{id}:
     *      get:
     *          summary: Get profile by ID
     *          description: Get user profile by user ID
     *          parameters:
     *              - $ref: '#/components/parameters/userIdParam'
     *          tags:
     *              - users
     *          responses:
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
     */
    router.get('/:profile_id', accountController.getProfile);

    /**
     * @swagger
     *  /api/v1/users/{id}:
     *      put:
     *          summary: Update account by ID
     *          description: Update an account's information using ID
     *          parameters:
     *              - $ref: '#/components/parameters/userIdParam'
     *          tags:
     *              - users
     *          responses:
     *              200: 
     *                  description: An updated account
     *                  content: application/json:
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
     *              404:
     *                   description: Invalid request parameters     
     *              500:
     *                   description: Internal server error                  
     */
    router.put('/:profile_id', imgUpload, accountController.updateAccount);

    /**
     * @swagger
     *  /api/v1/user/{id}:
     *      delete:
     *          summary: Delete an account token for log out
     *          desciption: Delete an account token for log out using ID
     *          parameters:
     *              - $ref: '#/components/parameters/userIdParam'
     *          tags:
     *              - users
     *          responses:
     *              200:
     *                  description: Account logged out
     *              500:
     *                  description: Internal server error
     */
    router.delete('/logout', accountController.logout);

    router.all('/', methodNotAllowed);
    router.all('/:profile_id', methodNotAllowed);

};