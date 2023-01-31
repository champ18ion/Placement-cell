const express = require('express');
const passport = require('passport');
const router = express.Router();
const dashboard = require('../controllers/dashboardController')
const reportController = require('../controllers/reportController')


// importing user controller
const userController = require('../controllers/userController')

// router for checking up the profile
router.get("/profile", passport.checkAuthentication, userController.profile);

//updating user profile
router.post("/update", passport.checkAuthentication, userController.updateUser);

router.get('/',userController.signUp)

router.get('/log-in',userController.signIn)

router.post('/create',userController.create)

// route for dashboard
router.get("/dashboard", dashboard.dashboard);

// use passport as middleware to authenticate
router.post(
    "/create-session",
    passport.authenticate("local", { failureRedirect: "/log-in" }),
    userController.createSession
  );

// route for logout button
router.get("/sign-out", userController.destroySession);


// route for downloading csv reports
router.get("/download", reportController.downloadCSVReport);


module.exports = router;