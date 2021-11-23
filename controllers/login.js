const passport = require('../lib/passport');
const {player} = require('./../models/');

module.exports = {
    login : passport.authenticate('local',{
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true
    }),
    loginapi : (req, res) => {
        player.authenticate(req.body)
        .then(user => {
            res.json({
                token: user.generateToken(), data : user.dataValues
            })
        })
    }
}