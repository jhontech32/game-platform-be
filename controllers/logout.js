module.exports = {
    logout : (req, res) => {
        req.logout();
        res.status(200).json({message : 'Anda telah logout'})
    }
}