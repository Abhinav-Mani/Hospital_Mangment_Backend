const express=require("express");

const authCheck=require("../util/auth_check");
const isReceptionist=require("../util/isReceptionist");
const isDoctor=require("../util/isDoctor");
const controller=require("../controllers/Shedule");

const route=express.Router();


module.exports=route;