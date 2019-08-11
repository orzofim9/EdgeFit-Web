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
  socket:SocketIOClient.Socket;
  usersList;
  displayedColumns: string[] = ['First Name', 'Last Name','Email','City','Address','Phone'];
  constructor(private http: HttpClient, private router: Router){
    this.socket = io.connect('http://localhost:5000');
  }

  ngOnInit() {
    this.getUsersList(); 
    this.socket.on("getUsers",userMap => {
      this.getUsersList();
    })
    
  }

  getUsersList(){
    this.http.get("http://localhost:5000/api/userDetails/usersList").subscribe(response=>{
    var list = Object.values(Object.entries(Object.values(response)));
    var uList = [];
    for(let i=0;i<list.length;i++){
      
      uList.push(list[i][1]);
    }
    this.usersList = uList;
  });
  }
}
