import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlist.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
   const { name, description } = req.body;

   if (!name || !description) {
      throw new ApiError(400, "Name and Description are required");
   }

   const alreadyExists = await Playlist.findOne({ name });
   if (alreadyExists) {
      throw new ApiError(
         400,
         `Playlist with name ${alreadyExists.name} already exists`
      );
   }

   const playlist = await Playlist.create({
      name,
      description,
      owner: req.user._id,
   });

   if (!playlist) {
      throw new ApiError(500, "Error while creating playlist");
   }

   console.log(playlist);

   res.status(200).json(
      new ApiResponse(200, playlist, "Playlist created successfully")
   );
});

const getUserPlaylists = asyncHandler(async (req, res) => {
   const playlists = await Playlist.find({ owner: req.user._id });

   if (!playlists) {
      res.status(200).json(
         new ApiResponse(200, { Playlists: 0 }, "You have 0 playlist")
      );
   } else {
      res.status(200).json(
         new ApiResponse(
            200,
            { playlists: playlists.length },
            "All playlist fetched successfully"
         )
      );
   }
});

const getPlaylistById = asyncHandler(async (req, res) => {
   const { playlistId } = req.params;

   if (!playlistId) {
      throw new ApiError(400, "Playlist id is required");
   }

   const palylist = await Playlist.findById(playlistId);

   if (!palylist) {
      throw new ApiError(
         400,
         "Playlist not found, please check the Id and try again"
      );
   }

   res.status(200).json(
      new ApiResponse(200, palylist, "Playlist fetched successfully")
   );
});

export { createPlaylist, getUserPlaylists, getPlaylistById };
