const userModel = require("../models/userModel");
const bcrypt= require("bcrypt");


const getUseControll= async(req,res)=>{
    try {
        const user=await userModel.findById({_id: req.body.id});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user NOt Found"
            })
        }
        user.password=undefined;
        res.status(200).send({
            success:true,
            message:'user get successfully',
            user,
        });
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"this is not user"
        })
        
    }

}

const updateUserController = async( req,res)=>{
    try {
        const user = await userModel.findById({_id:req.body.id})
        // userModel.validate

        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        const {userName,email,password,address,phone,}=req.body
        if(userName) user.userName=userName
        if(email) user.email=email
        if(password) user.password=password
        
        if(address) user.address=address
        if(phone) user.phone=phone;
        await user.save()
        res.status(200).send({
            success:true,
            message:"update user successfully"
        })
        
        
        
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success:false,
            message:"Error In Updata User Api"
        })
        
    }
    

}

const restartpassword = async(req,res)=>{
    try {
        const {email, newpassword,answer}=req.body
        if(!email || !newpassword ||!answer){
            return res.status(404).send({
                success:false,
                message:'please provide All fields'
            })
        }
        console.log("hi11")
        const user=await userModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:"user not found"
            })

        }
        console.log("hi 2222")
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newpassword,salt);
        user.password=hashedPassword
        await user.save();
        res.status(200).send({
            success:true,
            message:"password restart successfully"
        })
         


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in password repasswor"
        })
        
    }


}
 const updatepassword =async (req,res)=>{
    try {
        const user=await userModel.findById({_id:req.body.id})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found',
            })
        }
        const {oldPassword,newpassword}=req.body
        if(!oldPassword || !newpassword){
            return res.status(500).send({
                success:false,
                message:'please provide old or new password'
            })
        }
        const isMatch =await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(404).send({
                success:false,
                message:'Invalid redentials',
            })
        }
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newpassword,salt);
        user.password=hashedPassword;
        await user.save()
        res.status(200).send({
            success:true,
            message:'password in uptodated'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in update password API',
            error,
        })
        
    }

 }

//  delete user 
const deleteUserController =async (req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:'your account deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in deleted user REST Api'
        })
        
    }

}


module.exports={getUseControll,updateUserController,restartpassword, updatepassword,deleteUserController}