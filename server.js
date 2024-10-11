import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import connectMongoose from "./config/connectMongoose.js";
import sportCenterRoutes from "./routes/sportCenterRoutes.js";

const server = express();
server.use(express.json());
dotenv.config();
connectMongoose();

server.set("view engine", "pug");
server.use(express.static("public"));

server.use("/", router);
server.use("/api/sportCenters", sportCenterRoutes);
server.use("/helloworld", (req, res) => {
    res.send("Muffin Server");
})

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server start on ${PORT} port.`)
});