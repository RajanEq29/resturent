const testUserController =(req,res)=>{
    try {
        res.status(200).send({
            success:true,
            message:"this is new user",
        })
        
    } catch (error) {
console.log(error)        
    }

};



module.exports={testUserController}