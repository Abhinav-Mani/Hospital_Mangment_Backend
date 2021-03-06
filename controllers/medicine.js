require("dotenv").config();

const validator=require("validator");

const pool=require("../util/database");

exports.ADD=(req,res)=>{
    let name = req.body.name;
    let price=Number( req.body.price );
    let amount=Number( req.body.amount );
    let min = Number( req.body.min );
    addMedicine();
    async function addMedicine(){
        let connection;
        try{
            connection= await (await pool).getConnection();
            await connection.execute("INSERT INTO Medicince (MEDICINE_NAME,AMOUNT,PRICE,WARNING_LIMIT) VALUES ((:1),(:2),(:3),(:4))",[name,amount,price,min]);
            await connection.commit(); 
            res.status(200);
            return res.json({result:"Added"});
        }catch(err){
            res.status(500);
            return res.json(err);
        }
    }
}

exports.UPDATE=(req,res)=>{
    let name = req.body.name;
    let price=Number( req.body.price );
    let amount=Number( req.body.amount );
    let min =Number(req.body.min);
    console.log(name+" "+price+" "+amount+" "+min);
    updateMedicine();
    async function updateMedicine(){
        let connection;
        try{
            connection= await (await pool).getConnection();
            await connection.execute("UPDATE Medicince SET AMOUNT=(:1),PRICE=(:2),WARNING_LIMIT=(:3) WHERE MEDICINE_NAME=(:4)",[amount,price,min,name]);
            await connection.commit();
            res.status(200);
            return res.json({result:"Updated"});
        }catch(err){
            res.status(500);
            return res.json(err);
        }
    }
}

exports.DELETE=(req,res)=>{
    let name = req.query.name;
    removeMedicine();
    async function removeMedicine(){
        let connection;
        try{
            console.log(name);
            connection= await (await pool).getConnection();
            await connection.execute("DELETE FROM Medicince WHERE MEDICINE_NAME=(:1)",[name]);
            await connection.commit();
            res.status(200);
            return res.json({result:"Deleted"});
        }catch(err){
            res.status(500);
            return res.json(err);
        }
    }
}

exports.GET=(req,res)=>{
    getMedicine();
    async function getMedicine(){
        let connection;
        try{
            connection= await (await pool).getConnection();
            let result = await connection.execute("SELECT * FROM Medicince");
            res.status(200);
            return res.json(result.rows);
        }catch(err){
            res.status(500);
            return res.json(err);
        }
    }
}