var Product = require('../models/product.model');

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