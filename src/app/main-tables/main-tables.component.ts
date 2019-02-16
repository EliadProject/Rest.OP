import { Component, OnInit } from '@angular/core';
import { TableSocket } from '../tables-socket.service';
import {Table} from '../table'
import {TablesLogicService} from '../tables-logic.service'
import {TableChange} from '../tableChange';
import { takeLast } from 'rxjs/operators';
import { TableChangeOperation } from '../tableChangeOperation';


@Component({
  selector: 'app-main-tables',
  templateUrl: './main-tables.component.html',
  styleUrls: ['./main-tables.component.css'],
  
})
export class MainTablesComponent implements OnInit {

  constructor(private sockets : TableSocket,private tablesLogic: TablesLogicService) {
  }
  chairsNum: number = 8;
  
 
  lastTable: number = 0 ;
  jsonTable: TableChange;

  onSelect(table: Table) : void {
    if(this.tablesLogic.isAllowSelect){
    this.tablesLogic.selectedTable = table.id;

    let tableChangeOperaton = new TableChangeOperation()
    tableChangeOperaton.eventID = this.tablesLogic.eventID
    tableChangeOperaton.tableChange = new TableChange()
    tableChangeOperaton.tableChange.lastTable = this.lastTable;
    tableChangeOperaton.tableChange.newTable = table.id;
    

    this.sockets.tableSelected(tableChangeOperaton);
    }
  }
  getMockTables() : void {
    this.tablesLogic.tables = this.tablesLogic.getTables();
    
  }
  isTaken(table : Table) : Boolean{
    if(table.status === 2)
      return true
    else
      return false
    
  }

  checkIfContains(tableId: number) : boolean {
    return (this.tablesLogic.selectedByOther.indexOf(tableId) != -1);
  }

  ngOnInit() {
  //  this.getTables();
    
    //get changes from users trying to choose table
    this.sockets
    .tableChanged()
    .subscribe(msg => { 
      //change table selected by other
      let tableChange =  msg.tableChange 
      let lastIndex = this.tablesLogic.selectedByOther.indexOf(tableChange.lastTable) ;
      if(lastIndex  !== -1){ // Not contains msg number
        this.tablesLogic.selectedByOther.splice(lastIndex,1);   
      }
      this.tablesLogic.selectedByOther.push(msg.tableChange.newTable);
    })
  
  
    //get all changes when loging in
    this.sockets
    .allTables()
    .subscribe(tables => {

    //change table selected by other  
    this.tablesLogic.tables = tables;
  
    });

    //get all changes of tables anytime 
    this.sockets.
    allTablesBroadcast().
    subscribe(tables => {
      this.tablesLogic.tables = tables
     
    })

    this.sockets.
    allTablesTemp().
    subscribe(selectedByOther => {
      this.tablesLogic.selectedByOther = selectedByOther
     
    })

    
    }

  }

    

   

  




