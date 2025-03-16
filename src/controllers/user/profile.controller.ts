import { Response } from "express";
import { Request } from "../../types/request";
import { findBorrowedBookOfUser, getProfile, updateProfile } from "../../services/user.service";

export const getUserProfileController=async(req:Request,res:Response)=>{
    try{
            const authUSer=req.authUser;
            const role='user';
            const admin=await getProfile(authUSer._id,role);
            if(!admin){
                return res.status(404).json({
                    success:false,
                    message:"No Admin Found"
                })
            }
            return res.status(200).json({
                success:true,
                data:admin
            })
        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
}


export const updateUserProfileController=async(req:Request,res:Response)=>{
    try{
            const authUSer=req.authUser;
            const payload=req.body;
            const role='user';
            const updatedUser=await updateProfile(authUSer._id,role,{...payload});
            if(!updatedUser){
                return res.status(404).json({
                    success: false,
                    message:"No Admin Found"
                })
            }
            return res.status(200).json({
                success: true,
                data:updatedUser
            })
        }catch(err){
            return res.status(500).json({
                success: false,
                message:err.message
            })
        }
}

export const getBorrowedBooksController=async(req:Request,res:Response)=>{
    try{
        const authUserId=req.authuserId;
        const borrowedBooks=await findBorrowedBookOfUser(authUserId);
        if(!borrowedBooks){
            return res.status(404).json({
                success: false,
                message:"No borrowed Books Found"
            })
        }
        return res.status(200).json({
            success: true,
            data:borrowedBooks
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }}