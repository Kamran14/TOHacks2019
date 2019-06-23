import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../services/interview/interview.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions = [];

  constructor(private interviewService: InterviewService) { }

  ngOnInit() {
    this.questions = this.interviewService.getQuestions();
  }

  nextMessage() {

  }

}
