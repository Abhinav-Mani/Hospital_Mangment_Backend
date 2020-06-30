const express = require("express");
const bodyParser =require("body-parser");
const morgan = require("morgan");

const receptionist=require("./routes/Receptionist");
const doctor=require("./routes/Doctor");
const pharmacist=require("./routes/Pharmacist");
const patient=require("./routes/Patient");
const shedule=require("./routes/Shedule");
const medicine=require("./routes/Medicine");

const app=express();

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/receptionist",receptionist);
app.use("/doctor",doctor);
app.use("/pharmacist",pharmacist);
app.use("/patient",patient);
app.use("/shedule",shedule);
app.use("/medicine",medicine);

app.get("*",(req,res)=>{
    res.send("<h1>404</h1><p>Invalid Route</p>")
})

module.exports=app;