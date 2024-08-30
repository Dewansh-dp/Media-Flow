import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { User } from "./user.model.js";

const videoSchema = new Schema(
   {
      videoFile: {
         type: String, // cloudinary URL
         required: true,
      },
      thumbnail: {
         type: String, // cloudinary URL
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      duration: {
         type: Number,
         required: true,
      },
      views: {
         type: Number,
         default: 0,
      },
      ispublished: {
         type: Boolean,
         default: true,
      },
      owner: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);

// adding the video _id in the uploads field of user
videoSchema.post("save", async (req, next) => {
   await User.findByIdAndUpdate(req.owner, {
      $push: { uploads: req._id },
   });
   next();
});

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
