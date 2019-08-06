import { Component, OnInit } from '@angular/core';

import { Post } from './posts/post-list/post.model';
import { timingSafeEqual } from 'crypto';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}

  stored_posts: Post[] = [];

  onPostAdded(post){
    this.stored_posts.push(post);
  }

  ngOnInit(){
    this.authService.autoAuthUser();
  }
}
