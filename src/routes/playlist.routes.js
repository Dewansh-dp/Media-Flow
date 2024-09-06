import { Router } from "express";
import {
   addVideoToPlaylist,
   createPlaylist,
   getPlaylistById,
   getUserPlaylists,
   removeVideoFromPlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/create-playlist").post(createPlaylist);

router.route("/get-all-playlists").get(getUserPlaylists);

router.route("/get-playlist/:playlistId").get(getPlaylistById);

router.route("/add-video-to-playlist/:playlistId/:videoId").patch(addVideoToPlaylist);

router.route("/remove-video-from-playlist/:playlistId/:videoId").patch(removeVideoFromPlaylist)

export default router;
