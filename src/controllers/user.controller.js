const User = require('../models/User.js')
const Email = require('../models/Tweet.js')
const tokenobj = require('./JWT.js')
const createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const userExist = await User.findOne({ $or : [{username : username}, {email : email}]})
            .select({__id : 1});
        if (!userExist) {
            return res.status(400).json({error : true, msg : "User already exist"})
        }
        const newUserData = new User({
            username, email, password
        });
        const newUser = await newUserData.save();
        res.status(200).json({...newUser});
    } catch(err) {
        res.status(400).json({error : true, ...err});
    }
};

const getUser = async (req, res) => {
    try {
        const { email } = req.params.email;
        const result = await User.findOne({ email });
        if (!result) {
            return res.status(400).json({error : true, msg : "user not found"});
        }
        res.status(200).json({ ...result });
    } catch (err) {
        res.status(400).json({error : true, ...err});
    }
};

const sendMail = async (req, res) => {
    try {
        const { Subject, searchSpace, Message, token } = req.body;
        const { email } = await tokenobj.VarifyToken(token);
        if (!email) {
            return res.status(400).json({error : true, msg : "please login again"});
        }
        const newEmailData = new Email({
            Subject, searchSpace, Message,
            UserEmail : email
        });
        const newEmail = await newEmailData.save();
        res.status(200).json({msg : "success"});
    } catch (err) {
        res.status(400).json({error : true, ...err});
    }
};

const getUserInbox = async (req, res) => {
    try {
        const { token } = req.query;
        const { email } = await tokenobj.VarifyToken(token);
        if (!email) {
            return res.status(400).json({error : true, msg : "please login again"});
        }
        let result = await Email.find({$and : [{email : email}, {searchSpace : "Inbox"}]});
        res.status(200).json({Inbox : [...result]});
    } catch(err) {
        res.status(400).json({error : true, ...err});
    }
};

const getUserOutbox = async (req, res) => {
    try {
        const { token } = req.query;
        const { email } = await tokenobj.VarifyToken(token);
        if (!email) {
            return res.status(400).json({error : true, msg : "please login again"});
        }
        let result = await Email.find({$and : [{email : email}, {searchSpace : "Outbox"}]});
        res.status(200).json({Inbox : [...result]});
    } catch(err) {
        res.status(400).json({error : true, ...err});
    }
};

const searchMail = async (req, res) => {
    try {
        const { keyWord, searchSpace, token } = req.body;
        const { email } = await tokenobj.VarifyToken(token);
        if (!email) {
            return res.status(400).json({error : true, msg : "please login again"});
        }
        let result = await Email.find({$and : [{email : email}, {searchSpace : searchSpace}]});
        result = await result.find({Subject : {
            $regex : keyWord
        }});
        res.status(200).json({result : [...result]});
    } catch(err) {
        res.status(400).json({error : true, ...err});
    }
};

const blockUser = (req, res) => {
    //blockUser api logic here
};

const deleteMail = async (req, res) => {
    try {
        const { EmailId } = req.params.EmailId;
        await Email.findByIdAndDelete(EmailId);
        res.status(200).json({msg : "success"});
    } catch(err) {
        res.status(400).json({error : true, ...err});
    }
};

const UserController = {
    createUser,
    getUser,
    sendMail,
    getUserInbox,
    getUserOutbox,
    searchMail,
    blockUser,
    deleteMail
};

module.exports = UserController;