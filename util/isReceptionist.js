module.exports=(req,res,next)=>{
    if(req.user.post==="RECEPTIONIST"){
        next();
    }
    else{
        res.status(403);
        return res.send({errror:"Only RECEPTIONIST "+req.user.post+" not allowed"});
    }
}