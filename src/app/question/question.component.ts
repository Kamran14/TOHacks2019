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

  constructor(private interviewService: InterviewService) { }

  ngOnInit() {
    this.questions = this.interviewService.getQuestions();
  }

  nextMessage() {

  }

}
