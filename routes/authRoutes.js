const express= require('express');
const { registerContriller, login } = require('../controllers/authControllers');


const router=express.Router()

router.post('/register', registerContriller)

// LOGNONG USER/???
router.post('/login',login)

module.exports=router