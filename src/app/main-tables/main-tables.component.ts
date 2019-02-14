import { Component, OnInit } from '@angular/core';
import { TableSocket } from '../tables-socket.service';
import {Table} from '../table'
import {TablesLogicService} from '../tables-logic.service'
import {TableChange} from '../tableChange';


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
    this.tablesLogic.selectedTable = table.id;
    this.jsonTable = { lastTable: this.lastTable , newTable: table.id};
    this.lastTable = table.id;

    this.sockets.tableSelected(this.jsonTable);
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
      let lastIndex = this.tablesLogic.selectedByOther.indexOf(msg.lastTable) ;
      if(lastIndex  !== -1){ // Not contains msg number
        this.tablesLogic.selectedByOther.splice(lastIndex,1);   
      }
      this.tablesLogic.selectedByOther.push(msg.newTable);
    })
  
  
    //get all changes of tables within database  
    this.sockets
    .allTables()
    .subscribe(msg => { 
    //change table selected by other
    
    this.tablesLogic.tables = msg
    
    
      
    });

    
    }

  }

    

   

  




