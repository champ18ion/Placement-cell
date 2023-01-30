const express = require('express')
const router = express.Router();

// user router
router.use('/',require('./users'))
module.exports = router;