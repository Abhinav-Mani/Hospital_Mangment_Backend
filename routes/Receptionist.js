const express=require("express");

const authCheck=require("../util/auth_check");

const route=express.Router();

const controler=require("../controllers/receptionist")

route.get ("/",authCheck,controler.receptionist_get);
route.post("/",controler.SignUP);
route.post("/signin",controler.SignIn);
route.patch("/",controler.ChangePassword);

module.exports =route;