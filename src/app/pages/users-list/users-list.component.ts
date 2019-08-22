import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
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
  filters;
  displayedColumns: string[] = ['First Name', 'Last Name','Email','City','Address','Phone','Role','Options'];
  constructor(private http: HttpClient, private router: Router, private authService: AuthService){
    this.socket = io.connect('http://localhost:5000');
  }

  ngOnInit() {
    this.getUsersList();
    this.socket.on("getUsers",() => {
      this.getUsersList();
    });
  }

  /**
   * get Users list from server
   * parse response into array of jsons and set into this.usersList property
   */
  getUsersList(){
    this.http.post("http://localhost:5000/api/userDetails/usersList",this.filters).subscribe(response=>{
      var list = Object.values(Object.entries(Object.values(response)));
      var uList = [];
      for(let i=0;i<list.length;i++){

        uList.push(list[i][1]);
      }
      this.usersList = uList;
    });
  }

  onSearch(form: NgForm){
    const searchFilters = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      city: form.value.city
    }
    this.filters = searchFilters;
    this.socket.emit('searchUsers');
    console.log(this.filters);
  }

  onDelete(email){
    console.log("delete " + email);
    this.socket.emit('deleteUser', email);
  }
}
