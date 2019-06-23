const express = require('express');
const app = express();
const port = 3000;
const extractor = require('./extractor');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

app.listen(port, () => console.log(`Question gen app listening on port ${port}!`));