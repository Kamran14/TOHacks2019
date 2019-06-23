const express = require('express');
const app = express();
const port = 3000;
const extractor = require('./extractor');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const jsonfile = require('jsonfile')

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
    //console.log(data)
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        //console.log(this.responseText);
      
    }
    });

    xhr.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases", false);
    xhr.setRequestHeader("ocp-apim-subscription-key", "8bd00edfaa1e4b628dc659978083bbd9");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");

    xhr.send(data);

    //console.log("hi")
    
    //const phrases = JSON.parse(xhr.responseText)["documents"]["0"].keyPhrases;

    const phrases = ["Python", "Java", "C"];

    var userQuestions = JSON.parse('{"Questions":{"Technical":[], "General":[]}}');


    jsonfile.readFile('./Questions.json')
            .then(read => {
                
               // console.log(read);

                var questions = read;
                var myLangs = {};
  
                //console.log(questions["Questions"]["Technical"])                

                for (var i = 0; i < questions["Questions"]["Technical"].length; i++) {
                    
                    userQuestions["Questions"]["Technical"].push(questions["Questions"]["Technical"][i]);
                    
                    
                }
                //console.log(myLangs);
                res.send(userQuestions);
                //res.send(userQuestions); //Sends education & projects related stuff
            })
            .catch(error => console.error(error))


   // res.send(score);
});





app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    try{
    extractor.fileToJSON('resume.pdf').then((result) => {
        //res.send(result["experience"]);
        res.redirect('/response?response='+result["experience"])
    }).catch(error => new function(){
        console.log("Error Status: " + error);
    })
}catch( e){
    console.log("Fixme: " + e.toString());
}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));