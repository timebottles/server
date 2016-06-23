var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true
    },
    name: String,
    sex: String
});

module.exports = mongoose.model('user', userSchema);
