const mongoose = require('mongoose');
const EmailSchema = mongoose.Schema({
    UserEmail : {
        type : String,
        required : true
    },
    searchSpace : {
        type : String,
        required : true
    },
    Subject : {
        type : String,
        default : ""
    },
    Message : {
        type : String,
        default : ""
    }
}, {timestamps: true});
const Email = mongoose.model('Email', EmailSchema);
module.exports = Email;