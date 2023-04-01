const mongoose= require('mongoose')
const{Schema}= mongoose
const UserSchema = new Schema({
    emp_name:{
      type:String,
      required:true  
    },
    mo_no:{
        type:Number,
        required:true,
        unique:true
    },
    city: {
        type:String,
        required:true
    }, // String is shorthand for {type: String}
    prof: {
        type:String,
        required:true
    },
    salary:{
        type:Number,
        // required:true,
        // unique:true
    }   
   
  });
  const User=mongoose.model('user',UserSchema)
  module.exports=User