
var userResponse = "USERRESPONSEHERE"


var data = " {\n        \"documents\": [\n            {\n                \"language\": \"en\",\n                \"id\": \"0\",\n                \"text\": \""+userResponse+"\"\n            }\n        ]\n    }";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment", false);
xhr.setRequestHeader("ocp-apim-subscription-key", "8bd00edfaa1e4b628dc659978083bbd9");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("accept", "application/json");

xhr.send(data);

let resultAsJSON = xhr.responseText;