const express = require('express')
const user = require('../../models/user')
const verifyToken = require('../../middleware/verifyToken')

const router = express.Router()

router.get('/users', async (req, res)=>{
    try {
        const allUsers = await user.findAll();
        
        if (!allUsers || allUsers.length === 0) {
          return res.status(404).send({message:'Data not found'});
        }
    
        res.status(200).send(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({message: 'Internal Server Error'});
    }
})

exports.getUsersRouter = router