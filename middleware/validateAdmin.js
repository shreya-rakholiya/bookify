const validateAdmin=async(req,res,next)=>{
    if (!req.isAdmin) {
        return res.status(403).json({ message: "Unauthorized requests." })
      }
      next();
}
module.exports={validateAdmin}