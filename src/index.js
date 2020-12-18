const express = require('express')
const app = express()
const port = 8080
const newsArticleModel = require("./connector");

const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", (req, res) => {
    let limit = req.query.limit;
    let offset = req.query.offset;

    if(!limit || isNaN(limit) || limit<0){
        limit = onePageArticleCount;
    }

    if(!offset || isNaN(offset) || offset<0){
        offset = 0;
    }

    newsArticleModel.paginate({}, {offset: offset, limit: limit})
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err.message));
});




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;