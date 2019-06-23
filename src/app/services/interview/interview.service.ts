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

}
