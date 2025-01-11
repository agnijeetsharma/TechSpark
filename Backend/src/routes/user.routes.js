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
  CreateProfile,
  updateProfile,
  updateProfileImage,
  AllProfiles,
  getPotentialMatches,
  getUserProfile,
} from "../controllers/profile.controller.js";
const router = Router();

router.route("/register").post(
  // upload.fields(
  //     [
  //         {
  //          name:"avatar",
  //          maxCount:1
  //         },
  //         {
  //         name:"coverImage",
  //         maxCount:1

  //         }
  //     ]
  // ),
  registerUser,
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refesh-Token").post(refreshAccessToken);
router.route("/profile").post(
  verifyJWT,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  CreateProfile,
);
router.route("/updateProfile/:username").put(verifyJWT, updateProfile);
router.route("/update-profileImage/:username").post(
  verifyJWT,
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
  ]),
  updateProfileImage,
);

router.route("/allProfiles").get(verifyJWT, AllProfiles);
router.route("/allMatchProfiles").get(verifyJWT,getPotentialMatches)
router.route("/profile/view").get(verifyJWT,getUserProfile)

export default router;
