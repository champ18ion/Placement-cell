const express = require("express");

// importing the interview controller
const interviewController = require('../controllers/interviewController')
const router = express.Router();

// redering add interview page
router.get("/add-interview", interviewController.addInterview);

// creating a new interview
router.post("/create", interviewController.create);

// enrolling student in an interview
router.post("/enroll-in-interview/:id", interviewController.enrollInInterview);

// deallocate the student from the interview
router.get("/deallocate/:studentId/:interviewId", interviewController.deallocate);

// exporting the router
module.exports = router;
