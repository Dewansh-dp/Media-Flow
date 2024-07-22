import express from "express";
const app = express();

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
