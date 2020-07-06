const pool=require("../util/database");

exports.ADD_PRESCRIPTION=(req,res)=>{
    let list=req.body.list;
    let id=req.body.id;
    addPrescription();
    async function addPrescription(med){
        try{
            let connection=await (await pool).getConnection();
            for(let i=0;i<list.length;i++){
                med=list[i];
                await connection.execute("INSERT INTO prescription VALUES ((:1),(:2),(:3))",[id,med,0]);
            }
            await connection.commit();
            res.status(201);
        }catch(err){
            res.status(500);
            res.send({message:"failed"});
        }
    }
    //res.send("Prescription Route");
}

exports.GET_PRESCRIPTIONS=(req,res)=>{
    getPrescriptions()
    async function getPrescriptions(){
        try{
            let connection = await (await pool).getConnection();
            let results = await connection.execute("SELECT * FROM prescription");
            res.status(200);
            res.json(results.rows);
        }catch(err){
            res.status(500);
            res.json(err);
        }
    }
}