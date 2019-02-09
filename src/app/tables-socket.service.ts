import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

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
  
  
  getMessage() {
      console.log("someone broadcast")
      return this.socket
          .fromEvent("table-change")
          .pipe(map( data => data));
  }
  

}