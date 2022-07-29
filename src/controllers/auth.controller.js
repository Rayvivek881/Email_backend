const User = require('../models/User.js')
const tokenobj = require('./JWT.js')
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const result = await User.findOne({email : email});
        if (!result || UserExist.password != password) {
            return res.status(400).json({error : true, msg : "something went wrong"});
        }
        const token = await tokenobj.CreateToken(email);
        res.status(200).json({...result, token});
    } catch (err) {
        res.status(400).json({error : true, msg : "network error"});
    }
};


const AuthController = {
    login
};

module.exports = AuthController;