const express=require("express");

const authCheck=require("../util/auth_check");
const isPharmacist=require("../util/isPharmacist");
const controller=require("../controllers/medicine");

const route=express.Router();
route.get("/",authCheck,controller.GET);
route.post("/",authCheck,isPharmacist,controller.ADD);
route.patch("/",authCheck,isPharmacist,controller.UPDATE);
route.delete("/",authCheck,isPharmacist,controller.DELETE);

module.exports=route;