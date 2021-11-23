const {player_profile} = require('./../models');
const { body, validationResult, Result } = require('express-validator');

module.exports = {
    insertProfile : async(req, res) => {
        
        const errors = validationResult(req);
        console.log(errors.array())
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }
        
        const id = req.body.player_id;
        const find = await player_profile.findOne({where : {
            player_id : id
        }})

        if (find){
                await player_profile.update({
                full_name : req.body.full_name,
                address : req.body.address,
                phone_number : req.body.phone_number,
                city : req.body.city

            }, {where : {
                player_id : id
            }}).then(result => {
                res.status(200).json({messsage : 'Berhasil Memperbarui Data'})
            }).catch(error => {
                console.log(error)
            })
            
        }else{
            res.status(400).json({message : 'Data tidak ditemukan'})
        }
    },

    getProfile : async (req, res) => {
        res.status(200).json({data : req.user.dataValues})
        }
    }

