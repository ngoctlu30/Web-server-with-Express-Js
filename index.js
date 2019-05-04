require('dotenv').config();

console.log(process.env.SESSION_SECRET);

const express  = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true});

const userRoutes = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
// const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route');
const transferRoute = require('./routes/transfer.route')

var authMiddleware = require('./middleware/auth.middleware');
var sessionMiddleware = require('./middleware/session.middleware');

const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
// app.use(csurf( {cookie: true} ));

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/auth', authRoute);
app.use('/users',authMiddleware.requireAuth, userRoutes);
// app.use('/product', productRoute);
app.use('/cart', cartRoute);
// app.use('/transfer',authMiddleware.requireAuth, transferRoute);


app.listen(port, () => console.log('Example app listening on port ' + port));
