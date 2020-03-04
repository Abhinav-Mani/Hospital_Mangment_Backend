require("dotenv").config();

const validator=require("validator");

const pool=require("../util/database");

exports.ADD=(req,res)=>{
    res.send("add medicine");
}

exports.UPDATE=(req,res)=>{
    res.send("edit medicine");
}