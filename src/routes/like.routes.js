import { Router } from "express";
import { toggleVideoLike } from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT)

router.route("/toggle-video-like/:videoId").post(toggleVideoLike);

export default router;
