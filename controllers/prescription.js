const pool=require("../util/database");

exports.ADD_PRESCRIPTION=(req,res)=>{
    let list=req.body.list;
    let id=req.body.id;
    addPrescription();
    async function addPrescription(med){
        try{
            let connection=await (await pool).getConnection();
            console.log("connection set");
            console.log(list);
            for(let i=0;i<list.length;i++){
                med=list[i];
                await connection.execute("INSERT INTO prescription VALUES ((:1),(:2),(:3))",[id,med,0]);
            }
            res.send("sucess");
        }catch(err){
            console.log(err);
            res.send({message:"failed"});
        }
    }
    //res.send("Prescription Route");
}