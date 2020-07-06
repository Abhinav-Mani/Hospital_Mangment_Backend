const express = require("express");

const route=express.Router();
const controller = require("../controllers/prescription");

route.post("/",controller.ADD_PRESCRIPTION);
route.get("/",controller.GET_PRESCRIPTIONS);

module.exports=route;