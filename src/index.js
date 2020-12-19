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

    isNaN(req.query.limit) || !req.query.limit
        ? onePageArticleCount
        : parseInt(req.query.limit);

    if (!offset || isNaN(offset)) {
        offset = 0;
    }

    newsArticleModel.find().skip(offset).limit(limit)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err.message));
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;