import { Component } from '@angular/core';
import { Router } from 'node_modules/@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my app';

  constructor( public router: Router){
  }
}
