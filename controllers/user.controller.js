const db = require('../db');
var Product = require('../models/product.model');
var User = require('../models/user.model');

module.exports.index = function(req, res) {
	User.find().then( function(users) {
		res.render('users', {
			users: users
		});
	});
	
}

module.exports.search = function(req, res) {
	var q = req.query.q;
	User.find({}, function(err, data) {
		var matchedUsers = data.filter(function(user) {
			return user.name.toUpperCase().indexOf(q.toUpperCase()) !== -1;
		});
		res.render('users/index', {
			users: matchedUsers
		});
	});
};

// module.exports.create = function(req, res) {
// 	res.render('users/create');
// } 

module.exports.get = function(req, res) {
	var Id = req.params.id;
	User.findById(Id, function(err, data) {
			res.render('users/view', {
				users: data
			})
	});
}

module.exports.products = function(req, res) {
	var page = parseInt(req.query.page) || 1;
	var perPage = 1;
	var start = (page-1) * perPage;
	var end = page * perPage;
	Product.find().then(function(products) {
		res.render('products/index', {
			products: products.slice(start, end)
		});
	});
}

// module.exports.postCreate = function (req, res) {
// 	req.body.password = md5(req.body.password);
// 	req.body.avatar = req.file.path.split("\\").slice(1).join('/');
// 	db.get('users').push(req.body).write();
// 	res.redirect('/users');
// }