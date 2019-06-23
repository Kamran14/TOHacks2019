import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageText: string;
  @Input() sentByAI: boolean;
  @Input() technical: boolean;
  bgColor: string;

  constructor() { }

  ngOnInit() {
    if (this.sentByAI) {
      this.bgColor = 'rgb(72, 192, 214)';
    } else {
      this.bgColor = 'rgb(237, 87, 142)';
    }
  }
}
