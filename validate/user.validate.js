module.exports.postCreate = function(req, res, next) {
	var errors = [];
	var nameInput = req.body.name;
	var phoneInput = req.body.phone;
	if(!nameInput) {
		errors.push('Name is required.');
	}

	if(!phoneInput) {
		errors.push('Phone is required');
	}


	// var phoneInputToArray = phoneInput.split('');
	// for(var i = 0 ; i < phoneInputToArray.length ; i++) {
	// 	if( isNaN(parseInt(phoneInputToArray[i])) ) {
	// 		errors.push("Phone can't have character!!");
	// 		break;
	// 	}

	// }

	if(!isNaN(parseInt(nameInput))) {
		errors.push("Name can not start with number");
	}

	if(errors.length) {
		res.render('users/create', {
			errors: errors,
			values: req.body
		})
		return;
	}
	next();
}