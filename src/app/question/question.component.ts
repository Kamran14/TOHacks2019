import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../services/interview/interview.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions;
  index = 0;

  constructor(private interviewService: InterviewService) { }

  ngOnInit() {
    this.questions = this.interviewService.getQuestions();
  }

  nextMessage() {

  }


  getSentiment() {
    let sentimentNumber = this.interviewService.sentiment("We love this trail and make the trip every year. The views are breathtaking and well worth the hike!");
    console.log(this.questions);
  }

}
