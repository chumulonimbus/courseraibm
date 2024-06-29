const express = require('express')
const bcrypt = require('bcrypt')
const user = require('../../models/user')

const router = express.Router()

router.post('/register', async (req, res)=>{
    try {
        const {username, password} = req.body
        const getDataUser = await user.findOne({ where: {username} });
        
        if (getDataUser) {
          return res.status(409).send({message: `User ${username} is already registered!`});
        } 

        const hashPass = await bcrypt.hash(password, parseInt(10));
        await user.create({username, password: hashPass})
        res.status(200).send({message: 'User is successfuly registered!'});
        
    } catch (error) {
        console.error('Error creater user:', error);
        res.status(500).send({message: 'Internal Server Error'});
    }
})

exports.registerRouter = router