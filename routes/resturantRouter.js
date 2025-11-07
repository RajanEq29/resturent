const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getresturantdata, getByIdResturantData, deletResturantData } = require('../controllers/resturantController');


const router=express.Router();


router.post('/create',authMiddleware, createResturantController)
// get resturana data api 

router.get('/getresturantData', getresturantdata)
router.get('/getresturantId/:id', getByIdResturantData)
// delet resturant data 

router.delete('/deletResturantData/:id' , deletResturantData)


module.exports=router