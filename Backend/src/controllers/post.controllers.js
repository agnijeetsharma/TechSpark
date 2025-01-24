import { Post } from "../models/post.models.js"
import asyncHandler from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiErrors.js"
import{ apiResponse} from "../utils/apiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const createPost=asyncHandler(async(req,res)=>{
    const {title,content}=req.body
    console.log(title,content)
    if(!title||!content){
        throw new apiError(401,"Post details are missing ")
    }
   let postImagelocalpath;

   if (
     req.files &&
     Array.isArray(req.files.postImage) &&
     req.files.postImage.length > 0
   ) {
     postImagelocalpath = req?.files?.postImage[0]?.path;
    }
    const PostImage = await uploadOnCloudinary(postImagelocalpath)
 

    const post =new Post({
        title:title
        ,content
        ,postImage:PostImage?.url||""
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


export {createPost,postFeed,deletePost,updatePost}