import { Injectable } from '@angular/core';
import { ChatMessage } from '../chatbot/chat-message';
import { BehaviorSubject } from 'rxjs';

declare var require: any

const levenshtein = require('js-levenshtein'); 

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  intQuestions: string[] = [];
  url: string;

  mockQuestions = {
    "Questions":{
      "General":[
        {
           "index":38,
           "question":"Was there a person in your career who really made a difference?"
        },
        {
           "index":42,
           "question":"What are you looking for in terms of career development?"
        },
        {
           "index":66,
           "question":"Tell me one thing about yourself you wouldn't want me to know."
        }
     ],
       "Technical":[
          {
             "id":2,
             "languages":"Java, java",
             "question":"https://i.imgur.com/63MkXBr.png",
             "ans":"Reverse string or char array"
          },
          {
             "id":3,
             "languages":"C, c",
             "question":"https://i.imgur.com/fmpt4np.png",
             "ans":"Reverse int"
          }
       ]
    }
 };

  constructor() { }

  getQuestions() {
    return this.mockQuestions;

    // var fileURL = this.url;

    // var xhr = new XMLHttpRequest();

    // xhr.open("GET", "http://caliorbust.azurewebsites.net/response", false);
    
    // xhr.send();

    // let questions = JSON.parse(xhr.responseText);

    // return questions;

  }

 

  checkAnswer(response: string, question: JSON) {
   //technical Q
    if ("id" in question) {
      let distance = levenshtein(question["ans"], response)
      if (distance < 3 ) {
         return "Correct! Good Job!";
      } else if (distance < 10) {
         return "Close! Correct answer was: " + question["ans"];
      } else {
         return "Didn't match our answers! Correct answer was: " + question["ans"];
      }

    //general Q
    } else {
      let sentRes = this.sentiment(response);

      if (sentRes < 25) {
         return "Good try! But there's lots of room for improvement."
      } else if (sentRes < 50) {
         return "Almost! Better luck next time!";
      } else if (sentRes < 75) {
         return "Pretty good answer!"
      } else {
         return "Awesome job! You killed it!"
      }
    }
  }

  sentiment(response: string) {
    var userResponse = response;

    var data = " {\n        \"documents\": [\n            {\n                \"language\": \"en\",\n                \"id\": \"0\",\n                \"text\": \""+userResponse+"\"\n            }\n        ]\n    }";

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment", false);
    xhr.setRequestHeader("ocp-apim-subscription-key", "8bd00edfaa1e4b628dc659978083bbd9");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("accept", "application/json");

    xhr.send(data);

    let resultScore = Math.round(JSON.parse(xhr.responseText).documents[0].score*100);

    return resultScore;
  }

}