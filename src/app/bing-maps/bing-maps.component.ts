import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { marker } from '../shared/statistics'

@Component({
  selector: 'app-maps',
  templateUrl: './bing-maps.component.html',
  styleUrls: ['./bing-maps.component.css']
})
export class BingMaps  {
    title: string = 'Customers Map Location:';

    // google maps zoom level
    zoom: number = 11;
    
    // initial center position for the map
    lat: number = 32.065085;
    lng: number = 34.771324;
    private markers: marker[] = [];

    constructor(private http: HttpClient) {
      this.loadLocationFromDB();
    }

    private loadLocationFromDB()
    {
      const req = this.http.post('http://localhost:3000/locations', {}).subscribe(
            (res : marker[]) => {
              this.markers = res
            },
            err => {
            console.log("Error occured");
            }
        );
    }
  
    clickedMarker(label: string, index: number) {
      console.log(`clicked the marker: ${label || index}`)
    }
    
    mapClicked($event: MouseEvent) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
    }
    
    markerDragEnd(m: marker, $event: MouseEvent) {
      console.log('dragEnd', m, $event);
    }
  }