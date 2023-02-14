//dependencies

const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");
const path = require("path");

const app = express();

//middleware to support json
app.use(express.json());

// simple endpoint // GET http://localhost:8080/outfit
app.get("/outfit", (req, res) => {
    const tops = ["Black", "White", "Orange", "Navy"];
    const jeans = ["Grey", "Dark Grey", "Black", "Navy"];
    const shoes = ["White", "Grey", "Black"];

    res.json({
        //use lodash
        top: _.sample(tops),
        jeans: _.sample(jeans),
        shoes: _.sample(shoes)
    });
});

//Accept id as root parameter
app.get("/comments/:id", async (req, res) => {
    const id = req.params.id;
    let content;

    try{
        content = await fs.readFile(`data/comments/${id}.txt`, "utf-8")

    }catch(err){
        return res.sendStatus(404); //not found

    }
    res.json({
        content: content
    });
});

//POST Endpoint (async to use await)
app.post("/comments", async (req, res) => {
    //Create new uuid vor this comment
    const id = uuid();
    const content = req.body.content;

    if (!content){
        return res.sendStatus(400); //bad request
    }

    //make new directory on file system, named by id
    await fs.mkdir("data/comments", { recursive: true});
    await fs.writeFile(`data/comments/${id}.txt`, content)

    //get Json id
    res.status(201).json({
        id:id
    }); //success
});

// server runs on port 8080
//app.listen(8080, () => console.log("API Server is running..."));
//default to 8080
app.listen(process.env.PORT || 8080, () => console.log("Server is running..."));

app.use("/static", express.static(path.resolve(__dirname,"frontend", "static")));

// any route (path) goes back to root !
// one back ".."
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend", "index.html"));
});