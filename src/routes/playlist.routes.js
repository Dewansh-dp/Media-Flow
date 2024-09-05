import { Router } from "express";
import { createPlaylist } from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router= Router()
router.use(verifyJWT)

router.route("/create-playlist").post(createPlaylist)

export default router