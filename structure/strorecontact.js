const mongoose= require('mongoose')
const {Schema}= mongoose
const UserSchema= new Schema({
    user_name:{
        type:String,
        required: true
    },
    user_email:{
        type:String,
        required: true

    },
    user_phone:{
        type:Number,
        required: true
    },
    user_query:{
        type: String,
        required: true
    }
});
const User=mongoose.model('user_info',UserSchema)
module.exports=User