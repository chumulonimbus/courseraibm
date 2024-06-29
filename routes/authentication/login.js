const express = require('express')
const user = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const getDataUser = await user.findOne({ where: { username } });
        if (!getDataUser) {
            res.status(404).send({ message: "User not found" });
        }

        const checkPass = await bcrypt.compare(password, getDataUser.password);
        if(!checkPass){
            res.status(400).send({ message: "Incorrect password" });
        }

        const token = jwt.sign({uid: getDataUser.uid, username: getDataUser.username}, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({ uid: getDataUser.uid, username: getDataUser.username, token});
    } catch (error) {
        console.error('Error creater user:', error);
        res.status(500).send({message: 'Internal Server Error'});
    }
})

exports.loginRouter = router