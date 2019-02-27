import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Event } from '../event'
import { Table } from '../table'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private events: Event[] = [];
  private ttables: Table[] = [];
  private eventsUpdated = new Subject < { id: number; tables: Table[], startTime: any }>();



  constructor(private http: HttpClient) { }

  getNextEvents() {
    return this.http.get<[{ id: number, tables: any, startTime:any }]>("http://localhost:3000/event").pipe(
      map(eventData => {
        return {
          id: eventData[0].id,
          tables: []
        }
        /*
        return {
          id: eventData[0].id,
          tables: eventData[0].tables.map(table => {
            return {
              id: table._id,
              status: table.userId
            }
          })
        }*/
      })
    ).subscribe(transformedEventData => {
      this.ttables = transformedEventData.tables;
      this.eventsUpdated.next({
        tables: [...this.ttables],
        id: transformedEventData.id,
        startTime:5
      });
      });

  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

}
