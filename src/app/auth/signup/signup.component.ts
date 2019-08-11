import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  isLoading = false;
  userDetails;
  constructor(public authService: AuthService, private http: HttpClient, private router: Router) { }

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
    this.http.post("http://localhost:5000/api/userDetails/signup",this.userDetails).subscribe(response => {
      console.log(response);
      this.router.navigate(['/']);
    });
  }
}
