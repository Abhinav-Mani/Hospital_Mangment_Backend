const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");

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
            let accessToken=jwt.sign({
                user:username,
                post:"RECEPTIONIST"
            },
                process.env.ACCESS_TOKEN_SECRET
            );
            res.json({accessToken:accessToken});
        }
        catch(err){
            console.log(err);
            res.json({error:err})
            res.status(500);
        }
    } 
}

module.exports.SignIn = (req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    signIn();
    async function signIn(){
        let connection;
        try{
            connection=await (await pool).getConnection();
            result=await connection
            .execute("SELECT * FROM RECEPTIONIST WHERE USERNAME = (:1)",[username]);
            let hashPassword=result.rows[0][1];
            console.log(hashPassword+" "+password);
            let bool= await bcryptjs.compare(password,hashPassword);
            if(bool){
                res.status(200);
                let accessToken=jwt.sign({
                    user:username,
                    post:"RECEPTIONIST"
                },
                    process.env.ACCESS_TOKEN_SECRET
                );
                res.json({accessToken:accessToken});
            }else{
                res.status(401);
                res.json({error:"Username or Password is Wrong"});
            }
        }catch(err){
            res.status(500);
            res.send({error:"ISE"});
        }
    }
}