const joi=require("joi");
const { createNewsLetter } = require("../../services/newsLetter.service");

const newsLetterVAlidate=joi.object({
    email:joi.string().required(),
})

const  createNewsLetterController=async(req,res)=>{
    try{
        const payload = await newsLetterVAlidate.validateAsync(req.body);

        if(!payload){
            return res.status(400).json({
                success:false,
                message:"please enter email"
            })
        }
    
        const newsLetter = await createNewsLetter(payload);
        return res.status(201).json({
          success: true,
          msg: "Successfull",
          data:newsLetter,
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports={
    createNewsLetterController
}