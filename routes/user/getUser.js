const express = require('express')
const user = require('../../models/user')

const router = express.Router()

router.get('/user', async (req, res)=>{
    try {
        const { username, password } = req.body
        const userData = await user.findOne({ where: { username, password } });
        
        if (!userData) {
          return res.status(404).send({message:'User not found'});
        }
    
        res.status(200).send(userData);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({message: 'Internal Server Error'});
    }
})

exports.getUserRouter = router