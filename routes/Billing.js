const route=require("express").Router();

const controller = require("../controllers/billing");

route.post("/",controller.BILL);

module.exports=route;
