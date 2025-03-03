import { createTransport } from "nodemailer";

require("dotenv").config()

const transporter=createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PWD,
    },
})

export const mailsender=async(email:string,subject:string,content:string)=>{
    try{
        let mailOptions={
            from:process.env.SMTP_MAIL,
            to:email,
            subject:subject,
            html:content
        };
        transporter.sendMail(mailOptions,(err:any,info:any)=>{
            if(err){
                console.log(err);
            }
            // console.log(info)
            console.log('Mail sent',info.messageId);
        })
    }catch(err:any){
        console.log(err.message)
    }
}

