const pool = require("../util/database");

module.exports.BILL=(req,res)=>{
    let id=req.body.id;
    let mediciene=req.body.mediciene;
    console.log(id==="c810786598ee9d92");
    console.log(mediciene==="Med1");
    if(!id||!mediciene){
        res.status(401);
        return res.send({Error:"Missing Parmaeters"});
    }
    bill();
    async function bill(){
        let connection;
        try{
            connection=await(await pool).getConnection();
            await connection.execute("UPDATE medicince SET Amount=(SELECT Amount-1 from medicince where medicine_name=(:1)) where medicine_name=(:1)",[mediciene]);
            await connection.execute("update prescription set status=1 where medicine_name=(:1) and patient=(:2)",[mediciene,id]);
            await connection.commit();
            console.log(mediciene+" "+id);
            res.status(200);
            res.send("billing done");
        }catch(err){
            res.status(500);
            res.send(err);
        }finally{
            if(connection){
                connection.close();
            }
        }
    }
}