const db = require('../db');
const shortid = require('shortid');

module.exports.index = function(req, res) {
	res.render('users', {
		users: db.get('users').value()
	});
}

module.exports.search = function(req, res) {
	var q = req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user) {
		return user.name.toUpperCase().indexOf(q.toUpperCase()) !== -1;
	});
	res.render('users/index', {
		users: matchedUsers
	});
};

module.exports.create = function(req, res) {
	res.render('users/create');
} 

module.exports.get = function(req, res) {
	var id = req.params.id;
	var user = db.get('users').find({id : id}).value();
	res.render('users/view', {
		user : user
	});
}

module.exports.products = function(req, res) {
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var start = (page-1) * perPage;
	var end = page * perPage;
	res.render('products/index', {
		products: db.get('products').value().slice(start, end)
	});
}

module.exports.postCreate = function (req, res) {
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split("\\").slice(1).join('/');
	db.get('users').push(req.body).write();
	res.redirect('/users');
}