const pool= require("../util/database")
module.exports.receptionist_get=(req,res)=>{
    async function getall(){
        let connection;
        try{
            connection=await (await pool).getConnection();
            result = await connection.execute(`SELECT * from Students`);
            res.json(result.rows).status(200);
        }catch(err){
            res.send("Error");
        }
    }
    getall();
    //res.json({"status":"working"}).status(200);
}