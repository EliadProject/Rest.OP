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
  private eventsTimeUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient) { }

  getNextEvents() {
    return this.http.get<[{ _id: any, tables: any, startTime: any, endTime: any}]>("http://localhost:3000/event").pipe(
      map(eventData => {
        let eventsData = []
        eventData.forEach(x => {
          let moment = require('moment'); //momentjs
          let eventTime = moment.utc(x.startTime).format("DD-MM-YYYY HH:mm") + '-' + moment.utc(x.endTime).format("HH:mm");
          let event = { id: x._id, eventTime: eventTime }
          eventsData.push(event);
        })

        return eventsData;

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

  getEventTimeUpdateListener() {
    return this.eventsTimeUpdated.asObservable();
  }

}
