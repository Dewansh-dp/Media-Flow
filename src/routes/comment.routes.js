import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, updateComment } from "../controllers/comment.controller.js";
import { getVideoId } from "../middlewares/video_id.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/comment").post(getVideoId, addComment);

router.route("/update-comment").patch(getVideoId,updateComment)

export default router;
