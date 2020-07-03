const Users = require('../models/Users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
    function(username ,password , done){
        Users.findOne({username: username} , function(err , user){
            if(err) return done(err)

            if(!user || user.password != password){
                console.log('User not found /password is incorrect/ error occured');
                return doNotTrack(null , false);
            }

            return done(null , true);
        });
    }
));


passport.serializeUser(function(user , done){
    return done(null ,user.id )
});


passport.deserializeUser(function(id , done){
    Users.findById(id , function(err , user){
        if(err) return console.log('error --> passport');

        return done(null , user);
    });
});


passport.checkAuthentication = (req , res , next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/signin')
    }
   
}


passport.setAuthenticatedUser = (req , res , next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;