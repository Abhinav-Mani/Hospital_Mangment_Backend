const express=require("express");

const authCheck=require("../util/auth_check");
const isReceptionist=require("../util/isReceptionist");
const controller=require("../controllers/Patient");

const route=express.Router();

route.post("/",authCheck,isReceptionist,controller.AddPatient);
route.get("/",authCheck,controller.search);

module.exports=route;