import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-user',
  templateUrl: './question-user.component.html',
  // styles: [
  //   `
  //     ::ng-deep nb-layout-column {
  //       justify-content: center;
  //       display: flex;
  //     }
  //     nb-chat {
  //       width: 500px;
  //     }
  //   `,
  // ],
})
export class QuestionUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  messages: any[] = [
    {
      text: 'Custom template was provided as a title!',
      // date: new Date(),
      reply: false,
      user: {
        name: 'Bot',
        avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
      },
    },
  ];

  sendMessage(event:any) {
    this.messages.push({
      text: event.message,
      // date: new Date(),
      reply: true,
      user: {
        name: 'John Doe',
        avatar: 'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
      },
    });
  }

}
