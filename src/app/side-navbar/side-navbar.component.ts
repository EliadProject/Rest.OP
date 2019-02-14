import { Component, OnInit } from '@angular/core';
import {TablesLogicService} from '../tables-logic.service'
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  constructor(private tablesLogic : TablesLogicService) { }

  ngOnInit() {
  
     
  
  }
  name : string
  time : number
  attendies : number

  onReservation(){
    console.log(this.tablesLogic.tables)

  }
  
}
