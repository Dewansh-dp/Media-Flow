import { Router } from "express";
import {
   getLikedVideos,
   toggleVideoLike,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/toggle-video-like/:videoId").post(toggleVideoLike);

router.route("/get-liked-videos").get(getLikedVideos);

export default router;
