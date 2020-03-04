require("dotenv").config();

const validator=require("validator");

const pool=require("../util/database");

exports.Schedule=(req,res)=>{
    let id=req.body.id;
    setSchedule();
    async function setSchedule(){
        let connection;
        try{
            connection=await (await pool).getConnection();
            let result=await connection.execute("SELECT * FROM Schedule where trunc(SCHEDULE_TIME)=trunc(sysdate)");
            let rowCount=result.rows.length;
            if(rowCount>=process.env.MAX_NUMBER){
                return res.send({status:"DATE FULL"});
            }
            rowCount++;
            await connection.execute("INSERT INTO Schedule (QUEUE_NO,PATIENT_ID) VALUES ((:1),(:2))",[rowCount,id]);
            await connection.commit();
            res.status(200);
            return res.json({queueNo:rowCount});
        }catch(err){
            res.status(500);
            return res.json(err);
        }
    }

}