import { Injectable } from '@angular/core';
import { Table } from './table';
import { TablesMock } from './tables-mock'
@Injectable({
  providedIn: 'root'
})
export class TablesLogicService {
  
  //get tables from server 
  getTables(): Table[] {
    return TablesMock;
  }

  constructor() { 

  }
}
