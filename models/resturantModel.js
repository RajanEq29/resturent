const mongoose =require('mongoose');
const resturantSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true ,"Resrant title is requais"]

        },
        ImageUrl:{
            type:String,
            
        },
        foods:{
            type:Array
        },
        time:{type:String},
        pickup:{type:Boolean,
            default:true
        },
        delivery:{
            type:Boolean,
            default:true
        },
        isOpen:{
            type:Boolean,
            default:true
        },
        logoUrl:{
            type:String
        },
        rating:{
            type:Number,
            default:true
        },
        ratingCount:{
            type:String
        },
        code:{
            type:String
        },
        coords:{
            id:{
                type:String,
            },
            latitude:{typr:Number},
            latitudeDelta:{type:Number},
            longitude:{type:Number},
            longitudeDelta:{type:Number},
            address:{type:String},
            title:{type:String}

        }
    },{timestamps:true}
)
module.exports= mongoose.model('Resturant',resturantSchema)