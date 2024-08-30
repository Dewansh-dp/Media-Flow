import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
   {
      userName: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         index: true, // this makes searching(of userName) more efficient
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
      },
      fullName: {
         type: String,
         required: true,
         trim: true,
         index: true,
      },
      avatar: {
         type: String, //cloudinary Url will be stored
         required: true,
      },
      coverImage: {
         type: String, //cloudinary Url will be stored
      },
      watchHistory: [
         {
            type: Schema.Types.ObjectId,
            ref: "Video",
         },
      ],
      password: {
         type: String,
         required: [true, "Password is required"],
      },
      refreshToken: {
         type: String,
      },
      uploads: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
         },
      ],
   },
   { timestamps: true }
);

// hashing password just before saving the instance of model(i.e. object/User)
userSchema.pre("save", async function (next) {
   // encrypt password only when password field is modified
   if (!this.isModified("password")) return next();

   //    hashing password
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

//  adding custom method (isPasswordCorrect) for checking correctness of password
userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
};

// generating access token
userSchema.methods.generateAccessToken = function () {
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         userName: this.userName,
         fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
   );
};

// generating refresh token
// we keep less info(i.e. payload) in refresh token because it gets refreshed periodically
userSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
   );
};
export const User = mongoose.model("User", userSchema);
