import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getVideoById, publishVideo } from "../controllers/video.controller.js";

const router = Router();

router.route("/publish").post(
   verifyJWT,
   upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
   ]),
   publishVideo
);

router.route("/get-video-by-id/:id").get(getVideoById)

export default router;
