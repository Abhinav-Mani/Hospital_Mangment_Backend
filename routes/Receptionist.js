const express=require("express");

const route=express.Router();

const controler=require("../controllers/receptionist")

route.get("/",controler.receptionist_get);
//route.post("/",);

module.exports =route;
