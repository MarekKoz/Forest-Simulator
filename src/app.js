//set up express
const express = require("express");
const path = require("path");
const app = express();

//Path
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//Listen to port 3000
app.listen(3000);