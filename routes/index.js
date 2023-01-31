const express = require('express')
const router = express.Router();

// user router
router.use('/',require('./users'))
// student routes
router.use("/student", require("./students"));

// interview routes
router.use('/interview',require('./interviews'))

module.exports = router;