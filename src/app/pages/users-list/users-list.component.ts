import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: "root"
})
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  socket;
  usersList;
  constructor(private http: HttpClient, private router: Router){
    this.socket = io.connect('http://localhost:5000');
  }

  ngOnInit() {
    this.getUsersList();
    this.socket.on("getUsers",userMap => {
      //this.usersList = JSON.parse(userMap);
      console.log(this.usersList);
      this.getUsersList();
    })
  }

  getUsersList(){
    this.http.get("http://localhost:5000/api/user/usersList").subscribe(response=>{
    /* const users = Object.values(response);
     console.log(users);
     for(var user in users){
       console.log(user);
       var properties = Object.values(user);
       console.log(properties);
       this.usersList.push(properties[1]);     
      }
      console.log(this.usersList);*/

      console.log(response);
      this.usersList = response;
    });
  }
}
