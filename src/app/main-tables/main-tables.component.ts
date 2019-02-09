import { Component, OnInit } from '@angular/core';
import { TableSocket } from '../tables-socket.service';




@Component({
  selector: 'app-main-tables',
  templateUrl: './main-tables.component.html',
  styleUrls: ['./main-tables.component.css'],
  
})
export class MainTablesComponent implements OnInit {

  constructor(private sockets : TableSocket) {
  }
  tables : number[] = [1,2,3,4,5,6];
  chairsNum: number = 8;
  selectedTable : number;

  onSelect(tableIndex: number) : void{
    this.selectedTable = tableIndex;
    this.sockets.tableSelected(this.selectedTable);
  }

 
  

 

  ngOnInit() {  
    this.sockets
    .tableChanged()
    .subscribe(msg => {
      console.log("got message");
});
    }


      
  
    
 

  

  }

    

   

  




