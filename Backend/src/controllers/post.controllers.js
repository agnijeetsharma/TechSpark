import { Post } from "../models/post.models"
import asyncHandler from "../utils/asyncHandler"
import { apiError } from "../utils/apiErrors"
import{ apiResponse} from "../utils/apiResponse"

const createPost=asyncHandler(async(req,res)=>{
    const {title,description,postImage}=req.body
    const user=req.user
    if(!title||!description){
        throw new apiError(401,"Post details are missing ")
    }
    const post =new Post({
        title:title
        ,description:description
        ,postImage:postImage||""
    })
    await post.save()
    return res.status(200).json(new apiResponse(200,post,"new Post created successfully"));
})


export {createPost}