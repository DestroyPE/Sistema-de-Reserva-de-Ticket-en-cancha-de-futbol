import express from "express";

const server = express()

server.use("/helloworld", (req, res) => {
    res.send("Muffin Server");
})

server.listen(4000, () => {
    console.log("Server start on 4000 port.")
});