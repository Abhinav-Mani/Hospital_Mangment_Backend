const express = require("express");
const bodyParser =require("body-parser");

const app=express();

const receptionist=require("./routes/Receptionist");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/receptionist",receptionist);

app.get("*",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

module.exports=app;