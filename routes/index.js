var express = require("express");
var router = express.Router();
// var passport = require("passport");
// var User = require("../models/user");
// =================
// INDEX ROUTING
// =================

// LANDING - Index Route
router.get("/", (req, res) => {
    res.redirect("/dashboard");
});


module.exports = router;