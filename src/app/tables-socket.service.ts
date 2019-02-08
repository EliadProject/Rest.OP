import { Injectable } from '@angular/core';
import { Socket } from 'ng6-socket-io';

@Injectable()
export class TableSocket {
  
  constructor(private socket: Socket) { }
 
  sendMessage(msg: string){
      this.socket.emit("message", msg);
  }
  
  /*
  getMessage() {
      return this.socket
          .fromEvent("message")
          .map( data => data.msg );
  }
  */

}