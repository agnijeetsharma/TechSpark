// routes/user.routes.js
import { Router } from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import {
  updateProfile,
  updateProfileImage,
  getPotentialMatches,
  getUserProfile,
  getOtherUser,
  getFeed,
} from "../controllers/profile.controller.js";
import {ChatFeature }from  "../controllers/chatMessage.controller.js";
const router = Router();

router.route("/register").post(
  upload.fields(
      [
          {
           name:"profileImage",
           maxCount:1
          },
          // {
          // name:"coverImage",
          // maxCount:1

          // }
      ]
  ),
  registerUser,
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refesh-Token").post(refreshAccessToken);
router.route("/updateProfile").patch(verifyJWT, updateProfile);
router.route("/update-profileImage").post(
  verifyJWT,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  updateProfileImage,
);

router.route("/allMatchProfiles").get(verifyJWT,getPotentialMatches)
router.route("/profile/view").get(verifyJWT,getUserProfile)
router.route("/profile/:id").get(verifyJWT,getOtherUser)
router.route("/feed").get(verifyJWT,getFeed)
router.route("/chatMessage/:targetUserId").get(verifyJWT,ChatFeature)


export default router;
