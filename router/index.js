const router = require('express').Router();
const passport = require('passport');
const loginController = require('../controller/loginController');
const userController = require('../controller/userController');


router.get('/signin' , loginController.signin);
router.get('/signup' , loginController.signup);
router.post('/create-session' , passport.authenticate(
   'local',
   {failureRedirect: '/signin'}
) , function(req , res){ return res.redirect('/home')});

router.post('/create-account' , loginController.create_account)

router.get('/home' , passport.checkAuthentication , userController.home);



module.exports = router;