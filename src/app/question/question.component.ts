import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../services/interview/interview.service';
import { ChatMessage } from '../services/chatbot/chat-message';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions = [];
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
  curMessage: string;

  constructor(private interviewService: InterviewService) { }

  ngOnInit() {
    this.questions = this.interviewService.getQuestions();
  }

  nextMessage() {
    this.messages.push({
      sentByAI: false,
      message: this.curMessage
    } as ChatMessage);

    this.curMessage = null;
    console.log('updated messages: ' + JSON.stringify(this.messages));
  }
}
