import { Injectable } from '@angular/core';
import { ChatMessage } from '../chatbot/chat-message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  storedMessages: ChatMessage[] = []
  intQuestions: string[] = [];

  mockQuestions = ['message one', 'hi bitches', 'third message coming through'];

  constructor() { }

  getQuestions() {
    return this.mockQuestions;
  }

  getFeedback(response: string) {

  }

  nextMessage(message: ChatMessage, messageNum: number) {
    //push current response to storedmessages
    //retrieve and return next question
    this.storedMessages.push(message);
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
