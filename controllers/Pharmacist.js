const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");

require("dotenv").config();

let salRounds=Number(process.env.SALT_ROUND);

const pool= require("../util/database")
module.exports.PHARMACIST_get=(req,res)=>{
    res.send(req.user);
}

module.exports.SignUP=(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    if(!username||!password||!validator.isLength(username,{min:5,max:70})||!validator.isLength(password,{min:5,max:70})){
        res.status(400);
        return res.json({error:"Bad Request"});
    }
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
            .execute("SELECT USERNAME FROM PHARMACIST WHERE USERNAME = (:1)",[username]);
            a=result.rows.length;
            if(a>0){
                res.status(400);
                return res.json({error:"USER EXISTS"});
            }
            await connection
            .execute("INSERT INTO PHARMACIST (USERNAME,PASS) VALUES (:1,:2)",[username,hash]);
            await connection.commit();
            res.status(201);
            let accessToken=jwt.sign({
                user:username,
                post:"PHARMACIST"
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
    if(!username||!password){
        res.status(400);
        res.json({error:"Missing Parameter"});
    }
    signIn();
    async function signIn(){
        let connection;
        try{
            connection=await (await pool).getConnection();
            result=await connection
            .execute("SELECT * FROM PHARMACIST WHERE USERNAME = (:1)",[username]);
            if(result.rows.length===0){
                res.status(401);
                res.json({error:"Username or Password is Wrong"});
            }
            let hashPassword=result.rows[0][1];

            let bool= await bcryptjs.compare(password,hashPassword);
            if(bool){
                res.status(200);
                let accessToken=jwt.sign({
                    user:username,
                    post:"PHARMACIST"
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

module.exports.ChangePassword = (req,res)=>{
    let username=req.body.username;
    let oldpassword=req.body.oldpassword;
    let newpassword=req.body.newpassword;
    if(!username||!oldpassword||!newpassword){
        res.status(400);
        console.log(username+" "+oldpassword+" "+newpassword);
        return res.json({error:"Missing Parameter"});
    }
    bcryptjs.hash(newpassword,salRounds).then(hash=>{
        changePass(hash);
    }).catch(err=>{
        res.json({error:"Internal Server Error"}).status(500);
    })
    
    async function changePass(newHashPassword){
        let connection;
        try{
            connection=await (await pool).getConnection();
            result=await connection
            .execute("SELECT * FROM PHARMACIST WHERE USERNAME = (:1)",[username]);
            if(result.rows.length===0){
                res.status(401);
                res.json({error:"Username or Password is Wrong"});
            }
            let hashPassword=result.rows[0][1];
            let bool= await bcryptjs.compare(oldpassword,hashPassword);
            if(bool){
                await connection
                .execute("UPDATE PHARMACIST SET pass = (:1) WHERE username=(:2)",[newHashPassword,username]);
                await connection.commit();
                res.status(201);
                res.send({status:"Password Changed"});
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