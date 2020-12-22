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

app.route("/articles")
    .get((req, res) => {
        Article.find((err, foundArticles) => {
            if(!err){
                res.send(foundArticles);
            }else{
                res.send(err);
            }
        })  
    })
    .post((req, res) => {
        const article = new Article({title: req.body.title, content: req.body.content});
        article.save((err, newArticle) => {
            if(!err){
                res.send("Successfully created an article on wiki");
            }else{
                res.send(err);
            }
        })
    })
    .delete((req, res) => {
        Article.deleteMany((err) => {
            if(!err) {
                res.send("All the articles have been removed from the database");
            }else{
                res.send(err);
            }
        })
    })

app.route("/article/:articleId")
    .get((req, res) => {
        Article.findById({_id: req.params.articleId}, (err, foundArticle) => {
            if(!err){
                res.send(foundArticle)
            }else{
                res.send(err)
            }
        })
    })
    .put((req, res) => {
        Article.updateOne(
            {_id: req.params.articleId}, 
            {
                title: req.body.title, 
                content: req.body.content
            }, 
            (err, result) => {
                if(!err){
                    res.send(result)
                }else{
                    res.send(err)
                }
        })
    })
    .patch((req, res) => {
        Article.updateOne(
            {_id: req.params.articleId},
            {$set: req.body },
            (err, result) => {
                if(!err){
                    res.send(result)
                }else{
                    res.send(err)
                }
        })
    })

app.listen(3030, function() {
  console.log("Server started on port 3030");
});
