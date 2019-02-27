import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Event } from '../event'
import { Table } from '../table'


declare var require: any


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private events: Event[] = [];
  private ttables: Table[] = [];
  private eventsUpdated = new Subject < { id: number; tables: Table[], startTime: any }>();
  private eventsTimeUpdated = new Subject<Event[]>();



  constructor(private http: HttpClient) { }

  getNextEvents() {
    return this.http.get<[{ _id: any, tables: any, startTime:any }]>("http://localhost:3000/event").pipe(
      map(eventData => {
        let eventsData = []
        eventData.forEach(x => {

          let moment = require('moment'); //momentjs
          // moment.utc(x.startTime).format("HH:mm")
          let event = { id: x._id, startTime: moment.utc(x.startTime).format("HH:mm") }
          eventsData.push(event);
        })

        return eventsData;

        /*
         *
        return {
          id: eventData[0].id,
          tables: []
        }
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
      //this.ttables = transformedEventData.tables;
      /*
      this.eventsUpdated.next({
        tables: [...this.ttables],
        id: transformedEventData[0].id,
        startTime:5
      });
      */
      this.eventsTimeUpdated.next(transformedEventData);
      });

  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  getEventTimeUpdateListener() {
    return this.eventsTimeUpdated.asObservable();
  }

}
