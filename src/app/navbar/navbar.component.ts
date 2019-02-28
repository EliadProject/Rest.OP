import { Component, OnInit } from '@angular/core';
import { Router } from 'node_modules/@angular/router';
import * as $ from 'jquery';
import { AuthenticationService } from 'src/app/services';
import { User, Role } from 'src/app/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //private COFFEE = require("./images/coffee.png");
  //private BURGER = require("./images/burger.png");
  //private BEER = require("./images/beer.png");
  currentUser: User;

  constructor(public router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
      var thehours = new Date().getHours();
      var themessage;
      var morning = 'Good morning';
      var afternoon = 'Good afternoon';
      var evening = 'Good evening';

      if (thehours >= 0 && thehours < 12) {
        themessage = morning; 
        themessage += '<img [src]="COFFEE" />'
      }
      else if (thehours >= 12 && thehours < 17) {
        themessage = afternoon;
        themessage += '<img [src]="BURGER" />'

      } else if (thehours >= 17 && thehours < 24) {
        themessage = evening;
        themessage += '<img [src]="BEER" />'
      }

      $('#dayStatus').append(themessage);
  }

  get isAdmin() {
    return this.currentUser && this.authenticationService.roleType === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
