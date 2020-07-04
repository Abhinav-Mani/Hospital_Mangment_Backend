const express=require("express");
const route=express.Router();

const controler=require("../controllers/Email");

route.post("/",controler.MAIL);

module.exports=route;
