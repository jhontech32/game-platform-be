const express = require('express');
const router = express.Router();
const logout = require('../controllers/logout')
router.get('/',logout.logout)
//     req.logout();
    // res.render('login')
//     res.status(200).json({message : 'Anda telah logout'})
// })

module.exports = router;