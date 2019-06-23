const express = require('express');
const app = express();
const port = 3000;
const extractor = require('./extractor');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use(express.static('public'));  


const questions = [
    "hi1",
    "hi2",
    "hi3"
]

app.get('/question', (req, res) => {
    var question = questions[Math.floor(Math.random()*questions.length)];
    res.send(question);
});

app.get('/response', (req, res) => {
    //const responsedd = req.query.reponse;
    var data = " {\n        \"documents\": [\n            {\n                \"language\": \"en\",\n                \"id\": \"0\",\n                \"text\": \""+req.query.response+"\"\n            }\n        ]\n    }";
    console.log(data)
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        //console.log(this.responseText);
      
    }
    });

    xhr.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment", false);
    xhr.setRequestHeader("ocp-apim-subscription-key", "8bd00edfaa1e4b628dc659978083bbd9");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");

    

    xhr.send(data);

    console.log("hi")

    const score = JSON.parse(xhr.responseText)["documents"][0]["score"]

    res.send((Math.round(score*100, 0)).toString());
});





app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    let thing = extractor.fileToJSON('resume.pdf');
    res.send(JSON.stringify(thing));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));