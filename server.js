import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";

const server = express()
dotenv.config();

server.set("view engine", "pug");

server.use(express.static("public"));

server.use("/", router);

server.use("/helloworld", (req, res) => {
    res.send("Muffin Server");
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server start on ${PORT} port.`)
});