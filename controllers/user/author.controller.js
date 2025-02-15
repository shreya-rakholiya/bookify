const { findAuthor } = require("../../services/author.service");

const findAuthorController=async(req,res)=>{
    try{
        const data=req.body;

        const author=await findAuthor(data);

        if(!author){
            return res.status(404).json({
                success:false,
                message:"no Author Found"
            })
        }
        
        return res.status(200).json({
            success:true,
            data:author
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

module.exports={
    findAuthorController
}