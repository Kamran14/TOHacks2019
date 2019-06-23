import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../services/interview/interview.service';
import { ChatMessage } from '../services/chatbot/chat-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  end = false;

  descTitle = "Part 1: General";
  descDesc = "In this section, you'll be answering general behavioral questions. The chatbot will grade you on each question by sentiment.";

  questions;
  messages: ChatMessage[] = [
  ];
  curMessage: string;

  curCategory: string = "General";
  curQuestion = -1;

  constructor(private interviewService: InterviewService, public router: Router) { }

  ngOnInit() {
    this.questions = this.interviewService.getQuestions().Questions;

    this.messages.push({
      sentByAI: true,
      technical: null,
      message: "Hello, it's nice to meet you."
    })

    this.messages.push({
      sentByAI: true,
      technical: null,
      message: "Thank you for taking the time to interview with me today."
    })

    this.messages.push({
      sentByAI: true,
      technical: null,
      message: "We'll just start off with some general behavioral questions."
    })

    this.messages.push({
      sentByAI: true,
      technical: null,
      message: "First question:"
    })

    this.messages.push({
      sentByAI: true,
      technical: false,
      message: this.nextQuestion().question
    })
  }

  nextMessage() {
    this.messages.push({
      sentByAI: false,
      technical: null,
      message: this.curMessage
    } as ChatMessage);

    this.messages.push({
      sentByAI: true,
      technical: null,
      message: this.interviewService.checkAnswer(this.curMessage, this.questions[this.curCategory][this.curQuestion])
    });

    this.curMessage = null;

    let buf = this.nextQuestion();

    if (!buf) {
      this.messages.push({
        sentByAI: true,
        technical: null,
        message: "Alright, I think that's all the questions we had to ask you today."
      })

      this.messages.push({
        sentByAI: true,
        technical: null,
        message: 'Again, thank you for taking the time to interview with me.'
      })

      this.messages.push({
        sentByAI: true,
        technical: null,
        message: "I will contact you soon to let you know the company's decision."
      })

      this.messages.push({
        sentByAI: true,
        technical: null,
        message: 'Have a nice day!'
      })

      this.end = true;
      return;
    }

    if (this.curQuestion !== 0) {
      this.messages.push({
        sentByAI: true,
        technical: null,
        message: 'Next question:'
      })
    }

    this.messages.push({
      sentByAI: true,
      technical: this.curCategory == 'Technical' ? true : false,
      message: buf.question,
    })

    if (this.curCategory == 'Technical') {
      this.messages.push({
        sentByAI: true,
        technical: null,
        message: 'Please describe the function of this code in general terms'
      })
    }

    console.log('updated messages: ' + JSON.stringify(this.messages));
  }

  nextQuestion() {
    if (this.curCategory == 'Technical') {
      if (this.questions[this.curCategory].length - 1 > this.curQuestion) {
        this.curQuestion++;
        return this.questions[this.curCategory][this.curQuestion];
      } else {
        // END OF QUESTIONS
        return null;
      }
    }

    if (this.questions[this.curCategory].length - 1 > this.curQuestion) {
      this.curQuestion++;
      return this.questions[this.curCategory][this.curQuestion];
    } else {
      this.messages.push({
        sentByAI: true,
        technical: null,
        message: "Okay, so that's about all the general questions I have for you."
      })

      this.descTitle = "Part 2: Technical";
      this.descDesc = "In this section, you'll be answering technical questions relevant to your work. The chatbot will grade you on each question by correctness."

      this.messages.push({
        sentByAI: true,
        technical: null,
        message: "Let's move on to the technical questions now."
      })

      this.messages.push({
        sentByAI: true,
        technical: null,
        message: "So the first technical question I have for you is"
      })

      this.curCategory = 'Technical';
      this.curQuestion = 0;
      return this.questions['Technical'][this.curQuestion];
    }
  }
}
