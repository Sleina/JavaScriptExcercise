//dependencies

const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

//middleware to support json
app.use(express.json());

// simple endpoint // GET http://localhost:3000/outfit
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

// server runs on port 3000
app.listen(3000, () => console.log("API Server is running..."));