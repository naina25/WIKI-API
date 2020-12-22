const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/wikiDb', {useNewUrlParser: true, useUnifiedTopology: true});
const articleSchema = {
    title: String,
    content: String
}
const Article  = mongoose.model("Article", articleSchema)

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/articles", (req, res) => {
    Article.find((err, foundArticles) => {
        if(!err){
            res.send(foundArticles);
        }else{
            res.send(err);
        }
    })  
})

app.post("/articles", (req, res) => {
    const article = new Article({title: req.body.title, content: req.body.content});
    article.save((err, newArticle) => {
        if(!err){
            res.redirect("Successfully created an article on wiki");
        }else{
            res.send(err);
        }
    })
})

app.listen(3030, function() {
  console.log("Server started on port 3030");
});
