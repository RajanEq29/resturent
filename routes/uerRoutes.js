const express= require('express');
const { getUseControll, updateUserController, restartpassword, updatepassword, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');



const router=express.Router()


router.get('/userGet',authMiddleware,getUseControll)
// update profile? ?

router.patch('/profile',authMiddleware, updateUserController);
router.post('/restartpassword', authMiddleware,restartpassword);
router.post('/updatepassword', authMiddleware,updatepassword);

router.delete('/deletUser/:id',authMiddleware,deleteUserController);

module.exports=router