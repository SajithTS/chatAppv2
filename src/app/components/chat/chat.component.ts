import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy {
  
  messages:any = [];
  message:string;
  connection:any;
  username:string;
  alert:any = false;
  constructor(private ser:ChatService) { }

  ngOnInit() {
    this.connection = this.ser.getMessage().subscribe(
      msg => {
        console.log(msg);
        this.messages.push(msg);
      }
    );
  }

  sendMessage(){
    this.ser.sendMessgage(this.message,this.username);
    this.message = '';
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  setUsername(){
    if(this.username){
      this.ser.setUsername(this.username);
      this.alert = 'Username is set';
    }
    else{
      this.alert = false;
    }
  }

}
