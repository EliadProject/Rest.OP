import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import {TableOperation} from './tableOperation';
import { TableChangeOperation } from './tableChangeOperation';
import { TableChange } from './tableChange';
import { ChangeEventJSON} from './change-event-json';


@Injectable({
  providedIn: 'root'
})
export class TableSocket {

  constructor(private socket: Socket) { }
 
  //user selected table
  tableSelected(tableSelected: TableChange){
    //Create table operation
    
    this.socket.emit("table-select", tableSelected);
     
  }
  //user approved selection of table
  tableApproved(tableApproved: number){
    this.socket.emit("table-approve", tableApproved);
   
}
  //other user is try to finding a table
  tableChanged() {
      return this.socket
          .fromEvent<any>("table-changed")
          .pipe(map(data => data.description));
  }

  //other user is try to finding a table
  allTables() {
    return this.socket
        .fromEvent<any>("all-tables")
        .pipe(map(data => data.description));
}
  allTablesBroadcast() {
  return this.socket
      .fromEvent<any>("all-tables-broadcast")
      .pipe(map(data => data.description));
}

allTablesTemp() {
  return this.socket
      .fromEvent<any>("all-temp-status")
      .pipe(map(data => data.description));
}

changeEventTime(onChangeEvent : ChangeEventJSON){
  this.socket.emit("change-event-time", onChangeEvent);
}
userChangedRoom(){
  return this.socket
  .fromEvent<any>("clean-selected-by-other")
  .pipe(map(data => data));
}
eventPopularity(){
  return this.socket
  .fromEvent<any>("event-popularity")
  .pipe(map(data => data.description))
}



  
 

}