import { Router } from "express";
import {
   changeCurrentPassword,
   getCurrentUser,
   getUserChannelProfile,
   loginUser,
   logoutUser,
   refreshAccessToken,
   registerUser,
   updateAccountDetails,
   updateUserAvatar,
   updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
   upload.fields([
      // we cannot use upload.array() because it takes multiple args(files) in one single field only
      {
         name: "avatar",
         maxCount: 1,
      },
      {
         name: "coverImage",
         maxCount: 1,
      },
   ]),
   registerUser
);

//secure routes
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router
   .route("/update-avatar")
   .post(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
   .route("/update-cover-image")
   .post(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/get-current-user").get(verifyJWT, getCurrentUser);

router.route("/update-account-details").post(verifyJWT, updateAccountDetails);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router
   .route("/get-user-channel-profile/:userName")
   .post(verifyJWT, getUserChannelProfile);

export default router;
