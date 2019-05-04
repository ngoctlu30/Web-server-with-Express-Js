var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

var controller = require('../controllers/auth.controller');
var validate = require('../validate/user.validate')
var authMiddleware = require('../middleware/auth.middleware')

var router = express.Router();

router.get('/login', controller.login); 

router.post('/login', controller.postLogin);

router.get('/sign-in', controller.create);

router.post('/sign-in',
	upload.single('avatar'),
	validate.postCreate,
	controller.postCreate
)

module.exports = router;