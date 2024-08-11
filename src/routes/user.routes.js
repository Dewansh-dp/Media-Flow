import { Router } from "express";
import {
   loginUser,
   logoutUser,
   registerUser,
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

export default router;
