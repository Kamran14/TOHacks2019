//sentiment analysis

var data = " {\n        \"documents\": [\n            {\n                \"language\": \"en\",\n                \"id\": \"0\",\n                \"text\": \"123456\"\n            }\n        ]\n    }";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment");
xhr.setRequestHeader("ocp-apim-subscription-key", "8bd00edfaa1e4b628dc659978083bbd9");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);



//keyphrase id
var data = " {\n        \"documents\": [\n            {\n                \"language\": \"en\",\n                \"id\": \"0\",\n                \"text\": \"1234567890\"\n            }\n        ]\n    }\n";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases");
xhr.setRequestHeader("ocp-apim-subscription-key", "8bd00edfaa1e4b628dc659978083bbd9");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);

