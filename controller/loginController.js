const Users = require('../models/Users')


module.exports.signin = (req , res) => {
    res.render('signin')
}

module.exports.signup = (req , res) => {
    res.render('signup')
}

module.exports.create_account =async (req , res) => {
    let user = await Users.findOne({email: req.body.email});
    if(user){
        res.send('Email already exists');
        return;
    } else{
        let newUser = await Users.create({
            name: req.body.name.toLowerCase(),
            username: req.body.username.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: req.body.password
        });

        console.log('new user' , newUser);
        res.redirect('/signin');
    }


}


