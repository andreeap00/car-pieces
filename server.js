const express = require('express');
const dotenv = require('dotenv'); // used to separate our secret data from source code
const morgan = require('morgan'); //log a request on console when we make a req
const bodyParser = require("body-parser");
const path=require('path');
// const winston = require('winston');

const connectDB = require('./server/database/connection');
const logger = require('./logger');

const app = express();

dotenv.config({path: 'config.env'})
const PORT =process.env.PORT||8080;

// log req
app.use(morgan('tiny')); // print log message using morgan

//mongodb connection
connectDB();

//parse req to body-parser
app.use(bodyParser.urlencoded({extended:true}));

//set view engine as default
app.set("view engine", "ejs");

//load from assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));

// moved the routers to routes folder --> routes.js

//load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`)
});

// app.listen(PORT, ()=> {
//     logger.log('info', `Server running on http://localhost:${PORT}`);
// });