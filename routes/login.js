const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
var restrict = require('../middleware/restrict')

router.get('/', (req,res) => {
    if(req.isAuthenticated()){
        res.redirect('/home')
    }else{
        res.render('login')
    }
})
router.post('/', login.loginapi);

module.exports = router;