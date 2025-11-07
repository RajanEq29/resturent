const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: [true, "User name is required"] 
    },
    email: {
        type: String, 
        required: [true, 'Email is required'] 
    },
    password: {
        type: String, 
        required: [true, 'Password is required'] 
    },
    address: {
        type: String, 
    },
    phone: {
        type: String, 
    },
    userType: {
        type: String, 
        default: 'client', 
        enum: ['client', 'admin'] 
    },
    profile: {
        type: String, 
        default: 'https://img.freepik.com/premium-photo/collage-celebrating-diversity_23-2151693825.jpg'
    },
    answer:{
        type:String,
        required:[true,"answer in requires"],
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
