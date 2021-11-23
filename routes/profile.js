const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile');
var restrict = require('../middleware/restrict');
const { body, validationResult, Result } = require('express-validator');

router.post('/', restrict,

body('full_name').notEmpty().withMessage('Nama tidak boleh kosong'),
body('address').notEmpty().withMessage('Alamat tidak boleh kosong'),
body('phone_number').notEmpty().withMessage('No Telepon tidak boleh kosong'),
body('city').notEmpty().withMessage('Kota tidak boleh kosong'),

profile.insertProfile);

router.get('/', restrict, profile.getProfile)

module.exports = router;