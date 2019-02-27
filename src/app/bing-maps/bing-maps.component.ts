import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

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
    
    markers: marker[] = [
        {
            lat: 31.995767,
            lng: 34.740038,
            label: 'Hay Mizrachi',
            draggable: true
        },
        {
            lat: 32.003165,
            lng: 34.769160,
            label: 'Eliad Vertman',
            draggable: false
        },
        {
            lat: 32.073224,
            lng: 34.789529,
            label: 'Amir Sasson',
            draggable: true
        }
    ]
  }
  
  // just an interface for type safety.
  interface marker {
      lat: number;
      lng: number;
      label?: string;
      draggable: boolean;
  }
  