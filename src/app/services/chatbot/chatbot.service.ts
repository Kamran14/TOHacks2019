import { Injectable } from '@angular/core';
import { ChatMessage } from './chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  messages: ChatMessage[] = [
    {
      sentByAI: true,
      message: 'hihihi'
    },
    {
      sentByAI: false,
      message: 'ahhh'
    },
    {
      sentByAI: true,
      message: 'what the fuck did you just fucking say about me you'
    }
  ];

  constructor() { }

  getMessages(): ChatMessage[] {
    return this.messages;
  }

  storeNextMessage(message: ChatMessage): void {
    this.messages.push(message);
  }
}
