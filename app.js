const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});
const articleSchema = {
    title: String,
    content: String
}
const article  = mongoose.model("Article", articleSchema)

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

app.listen(3030, function() {
  console.log("Server started on port 3030");
});
