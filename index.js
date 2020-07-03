const express = require('express');
const db = require('./config/mongoose')
const mongoose = require('mongoose');
const cookieParser =require('cookie-parser');
const cors =require('cors')
const app = express();
const session = require('express-session');
const passport = require('passport')
const passport_local = require('./config/passport-local');
const mongoStore = require('connect-mongo')(session);



app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));



app.set('view engine' , 'ejs')
app.set('views' , './views')

app.use(session({
    name : 'ogstream' ,
    secret: 'blahsomething',
    saveUninitialized :false,
    resave: false,
    store: new mongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    }, function(err){
        console.log('error in mongo store' , err);
    })
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(cors());


app.use('/' ,  require('./router/index'))

app.listen(3000 , ()=>{
    console.log('Server listening to port 3000');
});
