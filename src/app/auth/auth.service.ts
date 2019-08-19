import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private isAuthenticated = false;
    private isAdminRole = false;
    private isAdminListener = new Subject<boolean>();
    private token: string;
    private tokenTimer: NodeJS.Timer;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router){}

    createUser(email: string, password: string){
        const authData: AuthData = { email: email, password: password };
        this.http.post("http://localhost:5000/api/user/signup",authData).subscribe(response => {
            console.log(response);
        });
    }

    login(email: string, password: string){
        const authData: AuthData = { email: email, password: password };
        this.http.post<{token: string, expiresIn: number}>("http://localhost:5000/api/user/login", authData).subscribe(async response =>{ 
            const token = response.token;
            this.token = token;
            console.log(response);
            if(token){
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.http.get("http://localhost:5000/api/userDetails/getUserRole/" + email).subscribe(response =>{   
                    if(response == 'admin'){
                        this.isAdminRole = true;
                    }
                    if(this.isAdminRole){
                        this.isAdminListener.next(true);
                    }
                    else {
                        this.isAdminListener.next(false);
                    }
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime()+expiresInDuration*1000);
                    this.saveAuthData(email,token,expirationDate);
                    this.router.navigate(['/']);
                });
            }
        });
    }

    private setAuthTimer(duration: number){
        this.tokenTimer = setTimeout(()=>{
            this.logout();
        }, duration * 1000);
    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.isAdminRole = false;
        this.isAdminListener.next(false);
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        //this.router.navigate(['/']);
    }

    async autoAuthUser(){
        const authInformation = this.getAuthData();
        if(!authInformation){
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if(expiresIn > 0){
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
            const email = localStorage.getItem('email');
            this.http.get("http://localhost:5000/api/userDetails/getUserRole/" + email).subscribe(response =>{   
                if(response == 'admin'){
                    this.isAdminRole = true;
                }
                if(this.isAdminRole){
                    this.isAdminListener.next(true);
                }
                else{
                    this.isAdminListener.next(false);
                }
            });
        }
    }

    private saveAuthData(email: string, token: string, expirationDate: Date){
        localStorage.setItem('email',email);
        localStorage.setItem('token',token);
        localStorage.setItem('expiration',expirationDate.toISOString());
    }
    private clearAuthData(){
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
    }
    private getAuthData(){
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        if(!token || !expirationDate){
            return;
        }
        return{
            token: token, 
            expirationDate: new Date(expirationDate)
        }
    }

    getToken(){
        return this.token;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getIsAuth(){
        return this.isAuthenticated;
    }

    getIsAdminListener(){
        return this.isAdminListener.asObservable();
    }
    getIsAdminRole(){
        return this.isAdminRole;
    }

    isAdmin(email: string){
        if(!email){
            return false;
        }
        
         this.http.get("http://localhost:5000/api/userDetails/getUserRole/" + email).subscribe(response =>{
            //let role = JSON.stringify(response);
            console.log(response=="admin");
            if(response == 'admin'){
                console.log("success");
                return true;
            }
            console.log("failed");
            return false;
        });
    }
}