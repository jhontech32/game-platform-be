var express = require('express');
var router = express.Router();

// Dummy data
let users = [
  {
    id: 1,
    name: 'Joko',
    age: 25
  },
  {
    id: 2,
    name: 'Deby',
    age: 25
  }
]

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - age
 *      properties:
 *        id: 
 *          type: integer
 *          description: The auto generate of id user
 *        name:
 *          type: string
 *          description: user name
 *        age:
 *          type: integer
 *          description: user age
 *      example:
 *        id: 1
 *        name: Jhon Doe
 *        age: 22
 */

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Return the list of all the users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: The list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get('/', (req, res, next) => {
  res.send(users);
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get the user by id
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *            type: integer
 *          required: true
 *          description: The user by id
 *      responses:
 *        200:
 *          description: The user by id
 *          contents: 
 *            application/json:
 *              schema:
*                 $ref: '#/components/schemas/User'
 *        404:
 *          description: The user is not found
*/
 router.get('/:id', (req, res, next) => {
  const user = users.find(user => user.id === Number(req.params.id))
  console.log('user id', user)
  if(!user) {
    res.sendStatus(404)
  }
  res.send(user);
});

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Create a new user
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user is successfully created
 *          content: 
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: something is wrong
*/
router.post('/', (req, res, next) => {
  try {
    const user = {
      id: 3,
      ...req.body
    }
    
    users.push(user)
    res.send(user)
  } catch (err) {
    return res.status(500).send(err)
  }
})

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update user by id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was up[dated]
 *        content:
 *          application/json:
 *            schema:
 *              $red: '#/components/schemas/User'
 *      400:
 *        description: The user was not found
 *      500:
 *        description: Seomthing went wrong
 */
router.put('/:id', (req, res, next) => {
  try {
    users.find({ id: req.params.id })
    res.send(users.find({ id: req.params.id }))
  } catch (err) {
    return res.status(500).send(err)
  }
})

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Remove the user by id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 * 
 *    responses:
 *      200:
 *        description: The user was deleted
 *      404:
 *        description: The user was not found
 */
router.delete('/:id', (req, res) => {
  const resultUser = users.filter((user) => user.id !== Number(req.params.id))
  console.log('result user', resultUser)
  res.send(resultUser)
  res.sendStatus(200)
})

module.exports = router;
