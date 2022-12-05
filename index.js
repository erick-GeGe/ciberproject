const express = require("express");
const app = express();

app.get('/', (req, res) => res.send("aqui deberia ir el proyecto"));

app.listen(3000);
console.log("runing", 3000);