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
  tables : Table[];
  chairsNum: number = 8;
  selectedTable : number;
  selectedByOther : number[] = [] ;
  lastTable: number = 0 ;
  jsonTable: TableChange;

  onSelect(table: Table) : void {
    this.selectedTable = table.id;
    this.jsonTable = { lastTable: this.lastTable , newTable: this.selectedTable};
    this.lastTable = this.selectedTable;

    this.sockets.tableSelected(this.jsonTable);
  }
  getTables() : void {
    this.tables = this.tablesLogic.getTables();
    
  }

  checkIfContains(tableId: number) : boolean {
    console.log(this.selectedByOther);
    return (this.selectedByOther.indexOf(tableId) != -1);
  }

  ngOnInit() {
    this.getTables();
    
    this.sockets
    .tableChanged()
    .subscribe(msg => { 
      //change table selected by other
      console.log(msg);
      let lastIndex = this.selectedByOther.indexOf(msg.lastTable) ;
      if(lastIndex  !== -1){ // Not contains msg number
        this.selectedByOther.splice(lastIndex,1);   
      }
      this.selectedByOther.push(msg.newTable);
    })
  }


      
  
    
 

  

  }

    

   

  




