import { Post } from "../models/post.models"
import asyncHandler from "../utils/asyncHandler"
import { apiError } from "../utils/apiErrors"
import{ apiResponse} from "../utils/apiResponse"

const createPost=asyncHandler(async(req,res)=>{
    const {title,description,postImage}=req.body
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

const postFeed=asyncHandler(async(req,res)=>{
    const posts=await Post.find().sort({createdAt:-1}).limit(10)
    return res.status(200).json(new apiResponse(200,posts,"Posts Feed"))

})

const updatePost=asyncHandler(async(req,res)=>{
    const post=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!post){
        throw new apiError(404,"Post not found")
        }
        return res.status(200).json(new apiResponse(200,post,"Post updated successfully"))
})

const deletePost=asyncHandler(async(req,res)=>{
    const post=await Post.findByIdAndDelete(req.params.id)
    if(!post){
        throw new apiError(404,"Post not found")
        }
        return res.status(200).json(new apiResponse(200,"Post deleted successfully"))
})


export {createPost,postFeed,deletePost}