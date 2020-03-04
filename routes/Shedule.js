const express=require("express");

const authCheck=require("../util/auth_check");
const isReceptionist=require("../util/isReceptionist");
const isDoctor=require("../util/isDoctor");
const controller=require("../controllers/Shedule");

const route=express.Router();

route.post("/",authCheck,isReceptionist,controller.Schedule);
route.get("/",authCheck,isDoctor,controller.PatientList);

module.exports=route;