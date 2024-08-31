import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
   deleteVideo,
   getVideoById,
   publishVideo,
   updateVideo,
} from "../controllers/video.controller.js";

const router = Router();

router.route("/publish").post(
   verifyJWT,
   upload.fields([
      { name: "videoFile", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
   ]),
   publishVideo
);

router.route("/get-video-by-id/:id").get(getVideoById);

router
   .route("/update")
   .patch(verifyJWT, upload.single("thumbnail"), updateVideo);

router.route("/delete-video/:id").delete(verifyJWT, deleteVideo);

export default router;
