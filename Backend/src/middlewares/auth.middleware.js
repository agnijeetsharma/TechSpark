import {apiError} from "../utils/apiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"
export const verifyJWT=asyncHandler(async (req,_,next)=>{
   try {
     const token=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer","")
     if(!token)throw new apiError(400,"unauthorized request");
     const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     const user=await User.findById(decodeToken?._id).select("-password -refreshToken")
     if(!user)throw new apiError(401,"Invalid Access Token")
        req.user=user
    next()
   } catch (error) {
     throw new apiError(401,error?.message||"Invalid access Token")
   }

})