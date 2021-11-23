module.exports = {
    home : (req, res) => {
        let dataPlayer = req.user.dataValues;
        res.status(200).json({data : dataPlayer, message : 'anda berhasil login'})
    }
}