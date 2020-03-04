module.exports=(req,res,next)=>{
    if(req.user.post==="DOCTOR"){
        next();
    }
    else{
        res.status(403);
        return res.send({errror:"unAuthorised"});
    }
}