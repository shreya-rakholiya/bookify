const mailer=require("nodemailer")
require("dotenv").config()

const transporter=mailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PWD,
    },
})

const sendMail=async(email,subject,content)=>{
    try{
        let mailOptions={
            from:process.env.SMTP_MAIL,
            to:email,
            subject:subject,
            html:content
        };
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                console.log(err);
            }
            // console.log(info)
            console.log('Mail sent',info.messageId);
        })
    }catch(err){
        console.log(err.message)
    }
}

module.exports=sendMail;