const express=require("express");

const authCheck=require("../util/auth_check");
const isReceptionist=require("../util/isReceptionist");
const controller=require("../controllers/Shedule");

const route=express.Router();

route.post("/",authCheck,isReceptionist,controller.Schedule);

module.exports=route;