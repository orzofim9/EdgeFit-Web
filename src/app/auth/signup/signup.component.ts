import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  socket:SocketIOClient.Socket;
  isLoading = false;
  userDetails;
  constructor(public authService: AuthService, private http: HttpClient, private router: Router) { 
    this.socket = io.connect('http://localhost:5000');
  }

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email,form.value.password);
    this.userDetails = {
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      birthday: form.value.birthday,
      city: form.value.city,
      address: form.value.address,
      phone: form.value.phone
    }
    console.log(this.userDetails);
    this.socket.emit('signUp',this.userDetails);
    this.router.navigate(['/']);
  }
}
