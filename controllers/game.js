const {player} = require('../models')

module.exports = {

    playSuit : async(req, res) => {
        // if(gameStart == false){alert('Silahkan pencet tombol play untuk memulai permainan');}
        let user = await player.findAll({
            where : {id : req.params.id}
        })
        let hasil = user.gamescore;
        let resultMessage = '';
        const pilihanPlayer = req.body.tangan
        const pilihanCOM = Math.floor(Math.random() * 3)

        //Note: 0 = Batu, 1 = Kertas, 2 = Gunting
        if(pilihanPlayer == pilihanCOM){
            resultMessage = "Seri"
        }
        else if((pilihanPlayer == 0 && pilihanCOM == 1)||
          (pilihanPlayer == 1 && pilihanCOM == 2)||
          (pilihanPlayer == 2 && pilihanCOM == 0)){
            resultMessage = "Kalah"
        }
        else{
            hasil++;
            await player.update({ gamescore : hasil}, {
                where: {
                    id : req.params.id
                }
            })
            resultMessage = "Menang"
        }
        res.json({
            handCOM: pilihanCOM,
            result: resultMessage,
            msg: "Apakah anda ingin bermain lagi?"
        });
    }
}