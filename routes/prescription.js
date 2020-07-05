const express = require("express");

const route=express.Router();
const controller = require("../controllers/prescription");

route.post("/",controller.ADD_PRESCRIPTION);

module.exports=route;