const express = require('express')
const app = express()
const port = 8080
const newsArticleModel = require("./connector");

const onePageArticleCount = 10


// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", (req, res) => {
    newsArticleModel.paginate({}, {offset: 0, limit: 10})
        .then(result => res.status(200).send(result));
});




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;