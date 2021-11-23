const bcrypt = require('bcrypt');
const {player, player_profile} = require('./../models/');
const { body, validationResult, Result } = require('express-validator');
// router.post('/',

	// body('username').notEmpty().withMessage('username tidak boleh kosong'),
  // body('email').isEmail().withMessage('Masukkan format email yang benar').notEmpty().withMessage('username tidak boleh kosong'),
  // body('password').notEmpty().isLength({min : 6}).withMessage('Mininal 6 karakter'),
  
  // async(req, res) => {
  //   const errors = validationResult(req);
  //   console.log(errors.array())
  //   if(!errors.isEmpty()){
  //     return res.status(400).json({errors : errors.array()})
  //   }

    // const find = await player.findOne({where : {username : req.body.username}});
    // if (find) {
    //   return res.status(400).json({message : 'username sudah ada'})
    // }


  //   bcrypt.hash(req.body.password, 10, (err, hash) => {

      // player.create({
      //   username : req.body.username,
      //   email : req.body.email,
      //   password : hash
      // }).then(result => {
      //   // return res.status(200).json({code : 200, message : 'berhasil menambah data'})
      //   player_profile.create({
      //   	address : req.body.address,
      //   	phone_number : req.body.phone_number,
      //   	city : req.body.city,
      //   	player_id : result.id
      //   })
      //   res.status(200).json({code : 200, message : 'Data Berhasil Disimpan'})
      // })

//     })

// 	})
module.exports = {
  
  create : async(req, res) => {
    
    const errors = validationResult(req);
    console.log(errors.array())
    if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()})
    }

    const find = await player.findOne({where : {username : req.body.username}});
    if (find) {
      return res.status(400).json({message : 'username sudah ada'})
    }
    
    if(req.body.password !== req.body.repeat_password) return res.status(400).json({message : 'password tidak sama'})

    bcrypt.hash(req.body.password, 10, (err, hash) => {

      player.create({
        username : req.body.username,
        email : req.body.email,
        password : hash
      }).then(result => {
        player_profile.create({
          player_id : result.id
        })
        res.status(200).json({code : 200, message : 'Data Berhasil Disimpan'})
      })
    })
  },
  
  // getData : async (req, res) => {
  //   const find = await player.findAll({include : [{model : player_profile, as : 'profile'}]});
  //   if(find){
  //     res.status(200).json(find)
  //   }else{
  //     res.status(200).json({message :'Tidak ada data'})
  //   }  
  // }
}
// router.get('/', async (req, res) => {
// 	const find = await user_game.findAll({include : [{model : player_profile, as : 'profile'}]});
//   // console.log(find)
//   if(find){
//     res.status(200).json(find)
//   }else{
//     res.status(200).json({message :'Tidak ada data'})
//   }
// })

// module.exports = router;