const express = require("express");

const app=express();

const receptionist=require("./routes/Receptionist");

app.use("/receptionist",receptionist);

app.get("*",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

module.exports=app;