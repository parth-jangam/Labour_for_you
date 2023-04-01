const express= require('express')
const app= express();
const fs= require('fs')
const mongoose= require('./db')
const path= require('path')
const User= require('./structure/storage');
const User1=require('./structure/strorecontact');
const { restart } = require('nodemon');
const { response } = require('express');
const cors= require('cors')
app.use(cors())

app.set('view engine','ejs')
mongoose();
app.use('/static',express.static('static'))
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/workers',(req,res)=>{
    res.render('workers')
})
app.get('/old_worker',(req,res)=>{
    res.render('already_reg')
})
app.get('/workers_register',(req,res)=>{
    res.render('workers_register')
})
app.post('/workers_register/submit',async(req,res)=>{

    user=await User.findOne({mo_no : req.body.number})
    if(user){
        
        return res.render('worker_submit')
    }
    const str= req.body.city_name
    const r=str.toLowerCase()
    // console.log(r);
    user=await User.create({
        
        emp_name: req.body.name,
        mo_no: req.body.number,
        city: r,
        prof: req.body.profession,
        salary:req.body.stipend

    })
    res.render('success',{RESPONSE:"Thank you!! to register with us"})
})
app.get('/workers_register/submit/change_mo_no',(req,res)=>{
    res.render('new_mo_no')
})

app.post('/workers_register/submit/change_mo_no/submit',async(req,res)=>{
    // user=await User1.findOne({mo_no:req.body.old_no})
    // console.log(user);
    user=await User.findOne({mo_no:req.body.new_mo})
    if(user){
       return res.render('negative_success',{RESPONSE:"Sorry the new mobile number entered by you is already exist"})
        
    }
    await User.updateOne({mo_no:req.body.old_no} ,{$set:  {mo_no: req.body.new_mo }}  )   
    
    
    // return res.send("your no updated successfully")
    // var s="your no updated successfully"
    // return res.render('success',{RESPONSE:s,flag:"true"});
    res.render('success',{RESPONSE:"Your mobile number update successfully"})

})
app.get('/workers_register/submit/change_city',(req,res)=>{
    res.render('new_city')
})
app.post('/workers_register/submit/change_city/submit',async(req,res)=>{
    user=await User.findOne({mo_no:req.body.number})
    if(user){
        const x=req.body.citty.toLowerCase()
        await User.updateOne({mo_no:req.body.number},{$set:{city:x}})
        return res.render('success',{RESPONSE:"Your city update successfully"})
       
        
    }
    res.render('negative_success',{RESPONSE:"We not have any user with this mobile number entered by you",BUTTON:"click here to newly register"})
})
app.get('/workers_register/submit/change_proff',(req,res)=>{
    res.render('new_proff')
})
app.post('/workers_register/submit/change_proff/submit',async(req,res)=>{
    user=await User.findOne({mo_no:req.body.number})
    if(user){
        await User.updateOne({mo_no:req.body.number},{$set:{prof:req.body.profession}})
        return res.render('success',{RESPONSE:"Your profession update successfully"})
    }
    
    res.render('negative_success',{RESPONSE:"We not have any user with this mobile number entered by you",BUTTON:"click here to newly register"})
})
app.get('/workers_register/submit/change_salary',(req,res)=>{
    res.render('new_salary')
})
app.post('/workers_register/submit/change_salary/submit',async(req,res)=>{
    user=await User.findOne({mo_no:req.body.number})
    if(user){
        await User.updateOne({mo_no:req.body.number},{$set:{salary:req.body.salary}})
        return res.render('success',{RESPONSE:"Your salary details update successfully"})
    }
    res.render('negative_success',{RESPONSE:"We not have any user with this mobile number entered by you",BUTTON:"click here to newly register"})
    
})
app.get('/old_worker/delete',(req,res)=>{
    res.render('delete')
})
app.post('/old_worker/delete/submit',async(req,res)=>{
    user=await User.findOne({mo_no:req.body.number})
    if(user){
        await User.deleteOne({mo_no:req.body.number})
        return res.render('success',{RESPONSE:"Your data deleted successfully"})
    }
    
    res.render('negative_success',{RESPONSE:"We not have any user with this mobile number entered by you",BUTTON:"click here to newly register"})
})
app.get('/recruiter_city_choice',(req,res)=>{
    res.render('recruiter_city_select')
})
app.post('/recruiter_city_choice/submit',async(req,res)=>{
    //  User.find({city:req.body.city_name},function(err,data){
    //     if(err){
    //         return res.send(err)
    //     }
    //     return res.send(data)
    //  })
    // console.log()
    // const {state,city_name}= req.body
    // const pj=await req.body.city_name
    // const rj=await String(req.body.city_name)
    const y=req.body.citty.toLowerCase()
    console.log(y)
    user=await User.find({city:y,prof:req.body.profession}).select({emp_name:1,mo_no:1,salary:1})
    if(user[0]==undefined){
        // return res.send("sorry we not able to see such worker in your city")
        // return res.render('success',{RESPONSE:"sorry we not able to see such worker in your city",flag:"false"})
    }
    User.find({city:y,prof:req.body.profession}).select({emp_name:1,mo_no:1,salary:1}).then((x)=>{
        console.log(x);
        res.render('table',{x})
    }).catch((y)=>{
        console.log(y)
        res.render()
    })

//    return  res.send(user)

    // return res.send();
})
app.get('/tex',(req,res)=>{
    fs.readFileSync('./index.txt').toJSON((err,data)=>{
        if(err){
           return res.send("error")
        }
        else{
           return res.send(data)
        }
    })
    // user= r.toJSON
    // res.send(r)
})
app.get('/contactus',(req,res)=>{
    res.render('contact_us')
})
app.post('/contactus/submit',async(req,res)=>{
    user=await User1.findOne({user_email:req.body.email})
    if(user){
        // return res.send("Hey!! you already submited your details we will contact you soon")
        // return res.render('success',{RESPONSE:"Hey!! you already submited your details we will contact you soon",flag:"true"})
    }
     user=await User1.create({
        user_name:req.body.Name,
        user_email:req.body.email,
        user_phone:req.body.Phone,
        user_query:req.body.Note

    })
    // res.send("we got your info we will contact you soon")
    res.render('success',{RESPONSE:"we got your info we will contact you soon"})
})
app.listen(8000,()=>{
    console.log("server listning on port 8000")
});
