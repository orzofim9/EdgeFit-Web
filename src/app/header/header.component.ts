import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  userIsAuthenticated = false;
  isAdmin = false;
  private authListenerSubs: Subscription;
  private roleListenerSubs: Subscription;
  
  constructor(private authService: AuthService){}

  ngOnInit(){
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.isAdmin = this.authService.getIsAdminRole();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated=>{ this.userIsAuthenticated = isAuthenticated; }
    );
    this.roleListenerSubs = this.authService
    .getIsAdminListener()
    .subscribe(isAdmin => { this.isAdmin = isAdmin; }
    );
  }

  ngOnDestroy(){  
    this.authListenerSubs.unsubscribe();
    this.roleListenerSubs.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
