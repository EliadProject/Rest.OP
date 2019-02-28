import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, UserDB } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class UserService {
    public usersList: UserDB[] = [];
    constructor(private http: HttpClient) { }

    getAll() {
        //return this.http.post('http://localhost:3000/users');
        return this.http.post('http://localhost:3000/users', {})     
    }

    getById(id: number) {
        return this.http.get<User>(`http://localhost:3000/users/${id}`);
    }
}