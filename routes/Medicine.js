const express=require("express");

const authCheck=require("../util/auth_check");
const isPharmacist=require("../util/isPharmacist");
const controller=require("../controllers/medicine");

const route=express.Router();

route.post("/",authCheck,isPharmacist,controller.ADD);
route.patch("/",authCheck,isPharmacist,controller.UPDATE);

module.exports=route;