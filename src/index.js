const express = require('express')
const app = express()
const port = 8080
const newsArticleModel = require("./connector");

const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", (req, res) => {
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);

    if(!limit || isNaN(limit) || limit<0){
        limit = onePageArticleCount;
    }

    if(!offset || isNaN(offset) || offset<0){
        offset = 0;
    }

    newsArticleModel.find()
        .then(result => res.status(200).send(result.slice(offset, limit+offset)))
        .catch(err => res.send(err.message));
    })


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;