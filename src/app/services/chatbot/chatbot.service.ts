import { Injectable } from '@angular/core';
import { ChatMessage } from './chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  messages: ChatMessage[] = [];

  constructor() { }

  getMessages(): ChatMessage[] {
    return this.messages;
  }

  storeNextMessage(message: ChatMessage): void {
    this.messages.push(message);
  }
}
