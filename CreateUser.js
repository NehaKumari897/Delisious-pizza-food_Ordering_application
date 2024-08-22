const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "muskanlohit$#"
router.post("/createuser", [
    body('email', 'incorrect email rechek your email again').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const Salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, Salt)

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            }).then(res.json({ success: true }))
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })
router.post("/loginuser", [
    body('email', 'Incorrect email. Please check your email again').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging in with correct Credentials" })
        }

        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging in with correct credentials" })
        }

        const data = {
            user:{
                id:userData.id
            }
        }

    const authToken = jwt.sign(data,jwtSecret)
        return res.json({ success: true ,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

module.exports = router;
