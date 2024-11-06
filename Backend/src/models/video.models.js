
import mongoose,{Schema} from "mongoose"
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const videoSchema=new Schema({
    videofile:{
type:String,
requried:true,
    },
    thumbnail:{
        type:String,
        requried:true,
    },
    title:{
        type:String,
        requried:true,
    },
   description:{
        type:String,
        requried:true,
    },
   duration:{
       type:Number,
        requried:true,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
videoSchema.plugin(aggregatePaginate);

export const Video=mongoose.model("Video",videoSchema)