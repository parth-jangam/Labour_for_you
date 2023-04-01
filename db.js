const mongoose= require('mongoose')
const mongoURL= "mongodb://localhost:27017/workers"
const connectTomongo=()=>{
    mongoose.connect(mongoURL,()=>{
        console.log("connect to mongo");
    })
}
module.exports=connectTomongo