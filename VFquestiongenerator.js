const express = require('express');
const app = express();
const port = 3000;
const extractor = require('./extractor');


const questions = [
    "hi1",
    "hi2",
    "hi3"
]



app.get('/question', (req, res) => {
    var question = questions[Math.floor(Math.random()*questions.length)];
    res.send(question);
});

app.listen(port, () => console.log(`Question gen app listening on port ${port}!`));