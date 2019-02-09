import { Component, OnInit } from '@angular/core';
import { TableSocket } from '../tables-socket.service';
import {Table} from '../table'
import {TablesLogicService} from '../tables-logic.service'


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
  selectedByOther : number;

  onSelect(table: Table) : void {
    this.selectedTable = table.id;
    this.sockets.tableSelected(this.selectedTable);
  }
  getTables() : void {
    this.tables = this.tablesLogic.getTables();
    
  }

  ngOnInit() {
    this.getTables();
    
    this.sockets
    .tableChanged()
    .subscribe(msg => { 
    //change table selected by other
    console.log(msg)
    this.selectedByOther = msg
    
      
    });

    
    }


      
  
    
 

  

  }

    

   

  




