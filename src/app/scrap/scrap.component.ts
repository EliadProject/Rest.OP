import { Component, OnInit } from '@angular/core';
import { Router } from 'node_modules/@angular/router';
import * as $ from 'jquery';
import { AuthenticationService } from 'src/app/services';
import { User, Role } from 'src/app/models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.css']
})
export class Scraping implements OnInit {
  currentUser: User;
  scrapList: [] = []
  name: string;

  constructor(public router: Router, private authenticationService: AuthenticationService, private http: HttpClient) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    
  }

  public onScrap()
  {
    // console.log(this.name)
    this.http.post('http://localhost:3000/getscrap', {name : this.name}).subscribe(
      (res : []) => {this.scrapList = res
      },
      err => {
      console.log("Error occured");
      }
  );
  }

}
