import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs/operators';
import { ViewEncapsulation } from '@angular/core';


import * as io from "socket.io-client";

@Component({
  selector: 'app-main-tables',
  templateUrl: './main-tables.component.html',
  styleUrls: ['./main-tables.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainTablesComponent implements OnInit {

  private url="http://localhost:3000";
  private namespace="/08";
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(this.url+this.namespace); 
    console.log(this.socket);
  }

  ngOnInit() {  

    let tables_JSON = [
      {centerX: 50, centerY:100, radius:10, checked:true},
      {centerX:50, centerY:200,  radius:10, checked:false},
      {centerX:200, centerY:100, radius:10, checked:false},
      {centerX:200, centerY:100,  radius:10, checked:false}];

      let container = document.getElementsByClassName("container-fluied");
   
    
    // tables generating count
    for(let  tables_index = 1; tables_index <= 6; tables_index++){
      let table_template =   document.createElement("ul");
      table_template.className = "circle-container";
    
    
      for (let i=1; i<=8; i++){
     
        let li = document.createElement("li");
     
        let section =  document.createElement("section")
        section.className = "event";
     
        let div = document.createElement("div");
        div.className = "event-content";
      
        let img = document.createElement("img");
        img.src="https://previews.123rf.com/images/asmati/asmati1702/asmati170212257/72968786-office-chair-sign-vector-white-icon-in-red-circle-on-white-background-isolated-.jpg";
        img.width = 200;
      
        div.append(img);
        section.appendChild(div);
        li.appendChild(section);
        table_template.appendChild(li);
    }
    container[0].appendChild(table_template);
  }
  

    let table1 =  document.createElement("div");
    table1.classList.add("circle-container");
    
   

    
    var tables = document.getElementsByClassName("circle-container")
    var last_clicked_table=tables[0]
    for (var i = 0; i < tables.length; i++) {
      tables[i].addEventListener('click',  function() {
        //remove class that was clicked
        last_clicked_table.classList.remove("clickedTable");
        //add new clicked table 
        this.classList.add("clickedTable");

        //this.socket.emit('tableChanged', 'sadsad');
        
        //save last clicked for next time
        last_clicked_table=this;
        
      });
    
    }
    
  // Connect to Namespace Socket.IO
      
  
    
    

  

  }
}
    

   

  




