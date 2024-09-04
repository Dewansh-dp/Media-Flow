import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment } from "../controllers/comment.controller.js";
import { getVideoId } from "../middlewares/video_id.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/comment").post(getVideoId, addComment);

export default router;
