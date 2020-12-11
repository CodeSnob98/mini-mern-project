const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://localhost/algoscaledb').then(() => console.log('Connected To mongodb'))
.catch((err) => console.log('Exception Occured ', err));;
const schemaForData=new mongoose.Schema({
    _firstN:String,
    _lastN:String,
    _email:String,
    _msg:String
});
const schemaForCount=new mongoose.Schema({
    _date:String,
    _count:Number
});
// db for data
const Data=mongoose.model('Data',schemaForData);
//db for count
const Count=mongoose.model('Count',schemaForCount);

//updating 2 dbs


app.post('/mainpage',(req,res)=>{
    
        const ele= new Data(
            {
                _firstN:req.body.firstN,
                _lastN:req.body.lastN,
                _email:req.body.email,
                _msg:req.body.msg
            }
        );
        ele.save();
        console.log("respomse saved");
    var utc = new Date().toISOString().slice(0,10).replace(/-/g,'/').toString();
    var findCount;
    Count.find({_date:utc},(err,data)=>{
        if(err){
            console.log("err",err)
        }else{
            console.log(data);
            if(data.length===0){
                const ele1=new Count({
                    _date:utc,
                    _count:1
                });
                ele1.save().then((resp)=>console.log(resp));
            }else{
                console.log(data[0]._count);
                let d=data[0]._date;
                let c=data[0]._count+1;
                Count.updateOne({_date:d},  
                    {_count:c}, function (err, docs) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        console.log("Updated Docs : ", docs); 
                    } 
                }); 
                console.log("count updated");
            }
        }
    });
});


//getting data from db using put can not use get coz the creating and reading is happening in the same url so no req.params here


app.put('/mainpage',(req,res)=>{
    Count.find({_date:{$gte:req.body.date1,$lte:req.body.date2}}).sort({_date:1}).then((ele)=>res.send(ele));
})

//adding empty data or count initater in the Count collection in every 24 hrs,

setInterval(()=>{
    var utc1 = new Date().toISOString().slice(0,10).replace(/-/g,'/').toString();
    Count.find({_date:utc1},(err,data)=>{
        if(err){
            console.log("err",err)
        }else{
            console.log(data);
            if(data.length===0){
                const ele1=new Count({
                    _date:utc1,
                    _count:0
                });
                ele1.save().then((resp)=>console.log(resp));
            }
        }

})},86400000);

app.listen(5000,()=>console.log("listening..."))
