var md5 = require('md5');
const User = require('../models/user.model');
var db = require('../db');
var shortid = require('shortid');

module.exports.login = function(req, res) {
	res.render('auth/login');
};

module.exports.postLogin = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var user = db.get('users').find( {email : email} ).value();
	if(!user) {
			res.render('auth/login', {
				errors:[
					'User doen not exist.'
				]
			});
			return;
	}

		var hashedPassword = md5(password);
		if(user.password !== hashedPassword) {
			res.render('auth/login', {
				errors: [
					'Wrong password'
				]
			});
			return;
		}
		
	res.cookie('userId', user.id, {
		signed: true
	});
	res.redirect('/users');
};

module.exports.create = function(req, res) {
	res.render('auth/sign-in');
};

module.exports.postCreate = function (req, res) {
	req.body.id = shortid.generate();
	req.body.password = md5(req.body.password);
	req.body.avatar = req.file.path.split("\\").slice(1).join('/');
	db.get('users').push(req.body).write();
	res.redirect('/auth/login');
}
