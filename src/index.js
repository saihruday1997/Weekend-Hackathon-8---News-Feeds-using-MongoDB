const express = require('express')
const app = express()
const port = 8080
const {newsArticleModel} = require("./connector");

const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", (req, res) => {
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);

    if (!req.query.limit || isNaN(req.query.limit) ) {
        limit = onePageArticleCount;
    }

    if (!req.query.offset || isNaN(req.query.offset)) {
        offset = 0;
    }

    newsArticleModel.find().skip(offset).limit(limit)
        .then(result => {(limit===0 && offset===0) ? res.status(200).send([]) : res.status(200).send(result)})
        .catch(err => res.status(500).send(err.message));
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;