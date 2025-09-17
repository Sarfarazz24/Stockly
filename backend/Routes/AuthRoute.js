const express = require("express");
const { Signup, Login } = require("../Controllers/AuthController");
const router = require("express").Router();
const { userverification } = require("../middlewares/Authmiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/verify", userverification);

module.exports = router;
