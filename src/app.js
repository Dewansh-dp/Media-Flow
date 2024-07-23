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
app.get("/", (req, res) => {
   res.send("home page");
});
app.on("ready", () => {
   console.log("app is ready to listen ");
});

//trigger the custom events
app.emit("ready"); // it's a predefined event
app.emit("errr");

//starts the server
app.listen(process.env.PORT, () => {
   console.log("port is 3000");
});
