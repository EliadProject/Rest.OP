import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-tables',
  templateUrl: './main-tables.component.html',
  styleUrls: ['./main-tables.component.css']
})
export class MainTablesComponent implements OnInit {

  constructor() { 

  }

  ngOnInit() {
     
    let tables_JSON = [
      {centerX: 50, centerY:100, radius:10, checked:true},
      {centerX:50, centerY:200,  radius:10, checked:false},
      {centerX:200, centerY:100, radius:10, checked:false},
      {centerX:200, centerY:100,  radius:10, checked:false}];

    let table1 =  document.createElement("div");
    table1.classList.add("circle-container");
    let container = document.getElementsByClassName("container-fluied");
    container[0].appendChild(table1);
    

    
    var tables = document.getElementsByClassName("circle-container")
    var last_clicked_table=tables[0]
    for (var i = 0; i < tables.length; i++) {
      tables[i].addEventListener('click',  function() {
        //remove class that was clicked
        last_clicked_table.classList.remove("clickedTable");
        //add new clicked table 
        this.classList.add("clickedTable");
        //save last clicked for next time
        last_clicked_table=this;
        
      });
    
    }
     
  

  }
}
    

   

  




