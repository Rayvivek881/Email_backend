const express = require("express");
const router = express.Router();
const {
    createUser,
    getUser,
    sendMail,
    getUserInbox,
    getUserOutbox,
    searchMail,
    blockUser,
    deleteMail
} = require('../controllers/user.controller');

// Create routes for user here
router.route('/register').post(createUser);
router.route('/getUser/:email').get(getUser);
router.route('/getUserInbox').get(getUserInbox);
router.route('/getUserOutbox').get(getUserOutbox);
router.route('/sendEmail').post(sendMail);
router.route('/deleteMail/:EmailId').delete(deleteMail);
router.route('/searchMail').post(searchMail);
module.exports = router;