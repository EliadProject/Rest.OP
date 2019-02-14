import { Injectable } from '@angular/core';
import { Table } from './table';
import { TablesMock } from './tables-mock'
@Injectable({
  providedIn: 'root'
})
export class TablesLogicService {
  

  tables: Table[]
  selectedTable : number
  selectedByOther : number[] = []
  //get tables from server 
  getTables(): Table[] {
    return TablesMock;
  }

  constructor() { 

  }
}
