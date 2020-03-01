const bcryptjs=require("bcryptjs");

require("dotenv").config();

let salRounds=Number(process.env.SALT_ROUND);

const pool= require("../util/database")
module.exports.receptionist_get=(req,res)=>{
    async function getall(){
        let connection;
        try{
            connection=await (await pool).getConnection();
            result = await connection.execute(`SELECT * from RECEPTIONIST`);
            res.json(result.rows).status(200);
        }catch(err){
            res.json({error:err});
        }
    }
    getall();
}

module.exports.SignUP=(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    bcryptjs.hash(password,salRounds).then(hash=>{
        createUser(hash);
    }).catch(err=>{
        res.json({error:"Internal Server Error"}).status(500);
    })
    async function createUser(hash){
        let connection;
        try{
            connection = await (await pool).getConnection();
            result=await connection
            .execute("SELECT USERNAME FROM RECEPTIONIST WHERE USERNAME = (:1)",[username]);
            a=result.rows.length;
            if(a>0){
                res.status(400);
                return res.json({error:"USER EXISTS"});
            }
            await connection
            .execute("INSERT INTO RECEPTIONIST (USERNAME,PASS) VALUES (:1,:2)",[username,hash]);
            await connection.commit();
            res.status(201);
            res.json({status:"Sucess"});
        }
        catch(err){
            console.log(err);
            res.json({error:err})
            res.status(500);
        }
    } 
}