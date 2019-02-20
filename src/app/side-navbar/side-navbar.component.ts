import { Component, OnInit } from '@angular/core';
import {TablesLogicService} from '../tables-logic.service'
import { FormsModule } from '@angular/forms';
import {Reservation} from '../reservation'
import {TableSocket} from '../tables-socket.service'
import { ChangeEventJSON } from '../change-event-json'
import { EventsMock } from '../events-mock'
import { Event } from '../event'

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  constructor(private tablesLogic : TablesLogicService, private tableSockets : TableSocket ) { }

  ngOnInit() {
   this.events = EventsMock
   this.eventTime = this.events[0].eventTime
  }
  events : Event[] 
  name : string = ""
  eventTime : number  = Date.now()
  attendies : number
  

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

  onChangeEventTime(event : any){
   
    let eventE : Event =  event.target.value
    //change eventTime variable
    this.eventTime = eventE.eventTime
    console.log("Event time is: " + this.eventTime)
    
    //create json to deliver to socket
    console.log("selected table :" + this.tablesLogic.selectedTable)
    let onChangeEvent : ChangeEventJSON = { eventID: event.id , selectedTable: this.tablesLogic.selectedTable};
    console.log("json is : " + onChangeEvent)

    //emit socket with json
    this.tableSockets.changeEventTime(onChangeEvent)
    
    
  }
  
  
}
