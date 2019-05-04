var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	password: String,
	phone: String,
	avatar: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;