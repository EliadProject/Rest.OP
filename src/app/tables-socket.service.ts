import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TableSocket {
  
  constructor(private socket: Socket) { }
 
  //user selected table
  tableSelected(tableSelected: number){
      this.socket.emit("table-select", tableSelected);
     
  }
  //user approved selection of table
  tableApproved(tableApproved: number){
    this.socket.emit("table-approve", tableApproved);
   
}
  
  /*
  getMessage() {
      return this.socket
          .fromEvent("table-change")
          .map( data => data.msg );
  }
  */

}