import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();

//enabling all cors request
app.use(
   cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
   })
);
//getting request in form of json data and setting its limit
app.use(express.json({ limit: "16kb" }));

//getting data from the URL (extended means object inside object)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//used to add pubic assets like favicon,images
app.use(express.static("public"));

//using cookieParser to allow server to perform curd operations on the client cookies
app.use(cookieParser());

//setting the event listener on ready and errr(i.e. error)
app.on("errr", () => {
   console.log("app is not listening ");
});
app.on("ready", () => {
   console.log("app is ready to listen ");
});
app.get("/", (req, res) => {
   res.send("home page");
});

//trigger the custom events
app.emit("ready"); // it's a predefined event
// app.emit("errr"); //it's user(our) defined event

// routes import

import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import commentRouter from "./routes/comment.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import tweetRouter from "./routes/tweet.routes.js";

// routes declaration

app.use("/api/v1/users", userRouter);
//http://localhost:8000/api/v1/users/register

app.use("/api/v1/videos", videoRouter);

app.use("/api/v1/subscriptions", subscriptionRouter);

app.use("/api/v1/comments", commentRouter);

app.use("/api/v1/playlists", playlistRouter);

app.use("/api/v1/tweets", tweetRouter);

export { app };
