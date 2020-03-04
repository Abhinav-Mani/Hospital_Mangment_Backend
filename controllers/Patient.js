require("dotenv").config();

const crypto=require("crypto");

const pool=require("../util/database");
const mailer=require("../util/Mailer")

exports.AddPatient=(req,res)=>{
    let firstName=req.body.firstName;
    let lastName=req.body.lastName;
    let email=req.body.email;
    if(!firstName||!lastName||!email){
        res.status(400)
        return res.json({error:"Missing Parameter"});
    }
    let id=crypto.randomBytes(8).toString('hex');
    addPatient();
    async function addPatient(){
        let connection;
        try{
            connection=await (await pool).getConnection();
            await connection.execute
            ("INSERT INTO Patient (PATIENT_ID,FIRST_NAME,LAST_NAME,EMAIL) VALUES ((:1),(:2),(:3),(:4))",[id,firstName,lastName,email]);
            await connection.commit();
            await mailer.send(email,id);
            res.status(201);
            res.json({status:"Success"});
        }catch(error){
            res.status(500);
            res.json(error);
        }
    }

}
