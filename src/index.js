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

    let query = {};
    query.skip = offset;
    query.limit = limit;

    newsArticleModel.find({},{}, query, function (err, result) {
        if(err){
            res.send(err.message);
            return;
        }

        res.status(200).send(result);

    })
    })


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;