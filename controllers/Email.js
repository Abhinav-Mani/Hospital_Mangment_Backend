const mailer=require("../util/Mailer");

module.exports.MAIL=(req,res)=>{
    let email=req.body.email;
    let message=req.body.message;
    mailEmail();
    async function mailEmail(){
        try{
            await mailer.sendAppointmentDetails(email,message)
            res.send({message:"Email Sent"});
            res.status(200);
        }catch(error){
            res.send({error});
            res.status(500);
        }
    }
}