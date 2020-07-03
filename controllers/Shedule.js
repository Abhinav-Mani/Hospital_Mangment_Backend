require("dotenv").config();

const validator=require("validator");

const pool=require("../util/database");
const mailer=require("../util/Mailer");

exports.Schedule=(req,res)=>{
    let id=req.body.id;
    let doctor=req.body.doctor;
    let date =req.body.date;
    setSchedule();
    async function setSchedule(){
        let connection;
        try{
            connection=await (await pool).getConnection();
            let result;
            let rowCount;
            result=await connection.execute("SELECT * FROM PATIENT WHERE PATIENT_ID=(:1)",[id]);
            rowCount=result.rows.length;
            if(rowCount<1){
                return res.send({Message:"No Such Patient Exists"});
            }
            const email=result.rows[0][3];
            result=await connection.execute("SELECT * FROM Schedule where trunc(SCHEDULE_DATE)=trunc(TO_DATE((:1),'YYYY-MM-DD')) AND PATIENT_ID=((:2))",[date,id]);
            rowCount=result.rows.length;
            if(rowCount>=1){
                return res.send({Message:"You have already Registered"});
            }
            result=await connection.execute("SELECT * FROM Schedule where trunc(SCHEDULE_DATE)=trunc(TO_DATE((:1),'YYYY-MM-DD')) AND Doctor_id=((:2))",[date,doctor]);
            rowCount=result.rows.length;
            if(rowCount>=process.env.MAX_NUMBER){
                return res.send({Message:"Date Full"});
            }
            rowCount++;
            await connection
            .execute("INSERT INTO Schedule (QUEUE_NO,PATIENT_ID,Doctor_id,SCHEDULE_DATE) VALUES ((:1),(:2),(:3),trunc(TO_DATE((:4),'YYYY-MM-DD')))",[rowCount,id,doctor,date]);
            await connection.commit();
            res.status(200);
            const message=`Your Token no for day ${date} is ${rowCount}`;
            await mailer.sendAppointmentDetails(email,message);
            return res.json({Message:message});
        }catch(err){
            res.status(500);
            return res.json(err);
        }
    }

}

exports.PatientList=(req,res)=>{
    getAllPatient();
    async function getAllPatient(){
        let connection;
        try{
            connection=await (await pool).getConnection();
            let result=await connection.execute("SELECT * FROM Schedule where trunc(SCHEDULE_TIME)=trunc(sysdate)");
            res.status(200);
            return res.json(result.rows);
        }catch(err){
            res.status(500);
            return res.json(err);
        }
    }
}