const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname,"frontend", "static")));

// any route (path) goes back to root !IMPORTANT!
// one back ".."
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend", "index.html"));
});

//default to 8080
app.listen(process.env.PORT || 8080, () => console.log("Server running..."));
