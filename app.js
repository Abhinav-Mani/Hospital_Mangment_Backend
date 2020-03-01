const express = require("express");
const bodyParser =require("body-parser");

const app=express();

const receptionist=require("./routes/Receptionist");
const doctor=require("./routes/Doctor");
const pharmacist=require("./routes/Pharmacist");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/receptionist",receptionist);
app.use("/doctor",doctor);
app.use("/pharmacist",pharmacist);

app.get("*",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

module.exports=app;