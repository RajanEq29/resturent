const mongoose=require('mongoose')
// functionali of connect tion?

const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect data base ${mongoose.connection.host}`)
        
    } catch (error) {
        console.log("db error",error)
        
    }
}
module.exports={connectDB}