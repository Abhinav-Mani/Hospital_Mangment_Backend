require("dotenv").config();

const crypto=require("crypto");
const validator=require("validator");

const pool=require("../util/database");
const mailer=require("../util/Mailer")

exports.AddPatient=(req,res)=>{
    let firstName=req.body.firstName;
    let lastName=req.body.lastName;
    let email=req.body.email;
    // /^[\w\.\-]+\@[\w]{2,5}\.[\w]{2,3}$/.test(email)
    if(!firstName||!lastName||!email){
        res.status(400)
        return res.json({error:"Missing Parameter"});
    }else if(!validator.isEmail(email)){
        res.status(400);
        return res.json({error:"Not an Email"});
    }else if(!validator.isLength(firstName,{min:5,max:70})||!validator.isAlpha(firstName)){
        res.status(400);
        return res.json({error:"Not a proper first name"});
    }else if(!validator.isLength(lastName,{min:5,max:70})||!validator.isAlpha(lastName)){
        res.status(400);
        return res.json({error:"Not a proper last name"});
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

exports.search=(req,res)=>{
    let id=req.query.id;
    let name=req.query.name;
    if(!name){
        name='%';
    }
    name=name+'%';
    if(!id){
        SearchByName();
    }else{
        SearchById();
    }
    async function SearchByName(){
        let connection;
        try{
            connection= await (await pool).getConnection();
            console.log(name);
            let result=await connection.execute("SELECT * FROM patient where lower(FIRST_NAME) LIKE lower((:1)) OR lower(LAST_NAME) LIKE lower((:1))",[name])
            res.status(200);
            return res.json(result.rows);
        }catch(err){
            res.status(500);
            return res.json(err);
        }
    }
    async function SearchById(){
        let connection;
        try{
            connection= await (await pool).getConnection();
            console.log(name);
            let result=await connection.execute("SELECT * FROM patient where PATIENT_ID = (:1)",[id])
            res.status(200);
            return res.json(result.rows);
        }catch(err){
            res.status(500);
            return res.json(err);
        }
    }

}

