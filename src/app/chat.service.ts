import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:8000';
  private socket:any;
  constructor() { }

  sendMessgage(msg:string,username:string){
    this.socket.emit('add-message',msg,username);
  }

  getMessage(){
    let observable = new Observable((observer:any) => {
      this.socket = io(this.url);
      this.socket.on('message',(data:any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect()
      };
    })
    return observable;
  }

  setUsername(name:string){
    sessionStorage.setItem('username',name);
  }

  getUsername(){
    return sessionStorage.getItem('username');
  }
}
