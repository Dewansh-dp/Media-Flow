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

export { createPlaylist };
