import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from 'src/app/models';
import { UserService } from 'src/app/services';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getAll().subscribe(
            (res : User[]) => {this.users = res
                console.log(this.users)
            },
            err => {
            console.log("Error occured");
            }
        );
    }
}