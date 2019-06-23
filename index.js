const express = require('express');
const app = express();
const port = 3000;
const extractor = require('./extractor');

app.get('/', (req, res) => {
    let thing = extractor.fileToJSON('resume.pdf');
    res.send(JSON.stringify(thing));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));