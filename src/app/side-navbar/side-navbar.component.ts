import { Component, OnInit } from '@angular/core';
import {TablesLogicService} from '../tables-logic.service'
import { FormsModule } from '@angular/forms';
import {Reservation} from '../reservation'
import {TableSocket} from '../tables-socket.service'
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  constructor(private tablesLogic : TablesLogicService, private tableSockets : TableSocket ) { }

  ngOnInit() {
  }
  name : string = ""
  time : number  = Date.now()
  attendies : number
  

  onReservation(){
   
    //Packaging the data to Reservation Object
    const reservation = new Reservation()
    reservation.name = this.name
    reservation.time = this.time
    reservation.attendies = this.attendies
    reservation.selectedTable = this.tablesLogic.selectedTable
    
    //Emit socket
    this.tableSockets.tableApproved(reservation.selectedTable);
    //User is not allow to reserve another table
    this.tablesLogic.isAllowSelect = false

  
  }
  
}
