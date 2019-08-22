import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  socket:SocketIOClient.Socket;
  email;
  userDetails;
  firstName="";
  lastName="";
  city="";
  address="";
  phone="";

  constructor(private http: HttpClient, private router: Router, public authService: AuthService) { 
    this.socket = io.connect('http://localhost:5000');
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.getUserDetails();
    this.socket.on('getUserDetails',()=>{
      this.getUserDetails();
    });
  }

  getUserDetails(){
    if(!this.email){
      alert("you need to log in");
      return;
    }
    this.http.get("http://localhost:5000/api/userDetails/getUserDetails/" + this.email).subscribe(response => {
      this.userDetails = Object.entries(response)[0][1];
      console.log(this.userDetails);
      this.firstName = this.userDetails.firstName;
      this.lastName = this.userDetails.lastName;
      this.address = this.userDetails.address;
      this.city = this.userDetails.city;
      this.phone = this.userDetails.phone;
    });
  }

  onUpdate(form: NgForm){
    const userDetails = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      city: this.city,
      address: this.address,
      phone: this.phone
    }
    console.log(this.userDetails);
    this.socket.emit('updateUserDetails',userDetails);
    /*this.http.post("http://localhost:5000/api/userDetails/updateDetails/" + this.email, userDetails).subscribe(response => {
      console.log(response);
      alert('Details updated!');
    })*/
    alert('Details updated!');
  }

  onDelete(){
    this.http.get("http://localhost:5000/api/userDetails/deleteUser/" + this.email).subscribe(response => {
      this.http.get("http://localhost:5000/api/user/deleteUser/" + this.email).subscribe(response => {
        console.log(response);
        alert('User deleted successfully');
        this.authService.logout()
        this.router.navigate(['/']);
      });
    });
  }
}
