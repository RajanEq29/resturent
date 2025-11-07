const userModel = require("../models/userModel");
const bcrypt= require("bcrypt");
const JWT=require('jsonwebtoken')

const registerContriller = async (req, res) => {
    try {
        const { userName, email, password, phone, address ,answer} = req.body
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please Provider All Fields"
            })
        }

        const exixiting = await userModel.findOne({ email })

        if (exixiting) {
            return res.status(500).send({
                success: false,
                message: 'Email alreadet Register Please Login'
            })
        }
        // consve to hashpasswor:

        const salt=bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hash(password,salt);


        const user = await userModel.create({ userName, email, password:hashedPassword, phone, address ,answer })
        res.status(201).send({
            success: true,
            message: "SuccessFully Register",
            user
        })
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: 'Error In register API',
            })

    }

};

const login =async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Please Proveide Email Or password "
            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User NOt Found'
            })
        }
        // checke user password \ cpmpare passworod
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).send({success:false,
                message:"invalid Cradetials",
            })
        }
        // create token 
        console.log("jhafsghfdj")
        const token=JWT.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        res.status(200).send({
            success:true,
            message:'Login Successfilly',
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Login API',
            error
        })
        
    }

}

module.exports = { registerContriller, login }