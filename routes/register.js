const express = require('express');
const router = express.Router();
const register = require('../controllers/register');
var restrict = require('../middleware/restrict');
const { body, validationResult, Result } = require('express-validator');

router.post('/',

body('username').notEmpty().withMessage('username tidak boleh kosong'),
body('email').isEmail().withMessage('Masukkan format email yang benar').notEmpty().withMessage('email tidak boleh kosong'),
body('password').notEmpty().isLength({min : 6}).withMessage('Mininal 6 karakter'),
 
register.create);

module.exports = router;
