const Users = require('../models/user')

const authsAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({ _id: req.user.id })
        if (user.role === 0)
            return res.status(400).json({ msg: "You need permission to access this site!" })
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authsAdmin