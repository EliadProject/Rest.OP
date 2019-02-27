import { Component, OnInit } from '@angular/core';
import {TablesLogicService} from '../tables-logic.service'
import { FormsModule } from '@angular/forms';
import {Reservation} from '../reservation'
import {TableSocket} from '../tables-socket.service'
import { ChangeEventJSON } from '../change-event-json'
import { EventsMock } from '../events-mock'
import { Event } from '../event'
import { Table } from '../table'
import { ApiService } from '../services/api.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  private eventsSub: Subscription;

  eventSelected: Event
  eventSelectedID: number
  events: Event[] = [];
  tbls: Table[] = [];
  tblsid: number
  name: string = ""
  eventTime: number = Date.now()
  attendies: number
  bla: any;

  constructor(private tablesLogic: TablesLogicService, private tableSockets: TableSocket, private api: ApiService) { }

  ngOnInit() {
   this.events = EventsMock
   this.eventTime = this.events[0].eventTime
   this.eventSelectedID = this.events[0].id
   this.eventSelected = this.events[0]
    
    this.api.getNextEvents()
    

    this.api.getNextEvents();
    this.eventsSub = this.api
      .getEventUpdateListener()
      .subscribe((eventData: { id: number, tables: Table[] }) => {
        //this.totalNotes = noteData.noteCount;
        //this.notes = noteData.notes;
        this.tbls = eventData.tables;
        this.tblsid = eventData.id;
        this.bla = eventData;
      });

   
  }


  onReservation(){
   
    //Packaging the data to Reservation Object
    const reservation = new Reservation()
    reservation.name = this.name
    reservation.time = this.eventTime
    reservation.attendies = this.attendies
    reservation.selectedTable = this.tablesLogic.selectedTable
    
    //Emit socket
    this.tableSockets.tableApproved(reservation.selectedTable);
    //User is not allow to reserve another table
    this.tablesLogic.isAllowSelect = false

  }

  onChangeEventTime(){
    
    //create json to deliver to socket
    let onChangeEvent : ChangeEventJSON = { eventID: this.eventSelected.id , selectedTable: this.tablesLogic.selectedTable};
  
    //emit socket with json
    this.tableSockets.changeEventTime(onChangeEvent)
    
    
  }
  
  
}
