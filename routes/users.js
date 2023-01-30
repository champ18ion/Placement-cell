const express = require('express');
const passport = require('passport');
const router = express.Router();


// importing user controller
const userController = require('../controllers/userController')

// router for checking up the profile
router.get("/profile", passport.checkAuthentication, userController.profile);

//updating user profile
router.post("/update", passport.checkAuthentication, userController.updateUser);

router.get('/',userController.signUp)

router.get('/log-in',userController.signIn)

router.post('/create',userController.create)


// use passport as middleware to authenticate
router.post(
    "/create-session",
    passport.authenticate("local", { failureRedirect: "/log-in" }),
    userController.createSession
  );

// route for logout button
router.get("/sign-out", userController.destroySession);

module.exports = router;