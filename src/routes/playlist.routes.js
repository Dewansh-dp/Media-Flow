import { Router } from "express";
import {
   createPlaylist,
   getPlaylistById,
   getUserPlaylists,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/create-playlist").post(createPlaylist);

router.route("/get-all-playlists").get(getUserPlaylists);

router.route("/get-playlist/:playlistId").get(getPlaylistById)

export default router;
