import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost,deletePost,postFeed,updatePost, userPost } from "../controllers/post.controllers.js";

import { upload } from "../middlewares/multer.js";


const router=Router();

router.route("/create").post(
     upload.fields(
          [
              {
               name:"postImage",
               maxCount:1
              },
          ]
      ),verifyJWT,createPost)
router.route("/update").patch(verifyJWT,updatePost)
router.route("/delete").delete(verifyJWT,deletePost)
router.route("/feed").get(verifyJWT,postFeed)
router.route("/userPost").get(verifyJWT,userPost)



export default router