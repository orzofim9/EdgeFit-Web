import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  email;
  userDetails;
  constructor(private http: HttpClient, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    if(!this.email){
      console.log("can't load user details");
      return;
    }
    this.http.get("http://localhost:5000/api/userDetails/getUserDetails/" + this.email).subscribe(response => {
      this.userDetails = Object.entries(response)[0][1];
      console.log(this.userDetails);
    });
  }

  onUpdate(form: NgForm){
    this.userDetails.firstName = form.value.firstName;
    this.userDetails.lastName = form.value.lastName;
    this.userDetails.city = form.value.city;
    this.userDetails.address = form.value.address;
    this.userDetails.phone = form.value.phone;

    console.log(this.userDetails);
    this.http.post("http://localhost:5000/api/userDetails/updateDetails/" + this.email,this.userDetails).subscribe(response => {
      console.log(response);
      alert('Details updated!');
    })
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
