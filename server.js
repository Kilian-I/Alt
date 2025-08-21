const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');


require('dotenv').config({path: './config/.env'});
require('./config/db');

const { checkUser , requireAuth } = require('./middleware/auth.middleware');
const app = express();


//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//
app.use(checkUser); // Middleware to check user authentication

app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json(res.locals.user._id);
});

//routes
app.use('/api/users', userRoutes);
//

//server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}` )
    })
