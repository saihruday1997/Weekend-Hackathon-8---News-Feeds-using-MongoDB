const express = require('express')
const app = express()
const port = 8080
const {newsArticleModel} = require("./connector");

const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", (req, res) => {
    let givenLimit = req.query.limit;
    let givenOffset = req.query.offset;

    let limit = parseInt(givenLimit);
    let offset = parseInt(givenOffset);

    if (!givenLimit) {
        limit = onePageArticleCount;
    }

    if (!givenOffset || isNaN(offset)) {
        offset = 0;
    }

    if (isNaN(limit) || limit < 0) {
        limit = onePageArticleCount;
        if (!givenOffset) {
            offset = 0;
        }
    }

    newsArticleModel.find().skip(offset).limit(limit)
        .then(result => res.status(200).send(result))
        .catch(err => res.send(err.message));
});


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;