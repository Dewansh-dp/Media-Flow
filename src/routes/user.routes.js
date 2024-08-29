import { Router } from "express";
import {
   changeCurrentPassword,
   downloadAvatar,
   downloadCoverImage,
   getCurrentUser,
   getUserChannelProfile,
   getWatchHistory,
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
   .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
   .route("/update-cover-image")
   .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/update-account-details").patch(verifyJWT, updateAccountDetails);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/channel/:userName").get(getUserChannelProfile);

router.route("/watch-history").get(verifyJWT, getWatchHistory);

router.route("/download-avatar").get(verifyJWT, downloadAvatar);

router.route("/download-cover-image").get(verifyJWT, downloadCoverImage);

export default router;
