import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
  socket:SocketIOClient.Socket;
  posts = [];
  isAdmin;
  postToEdit = 0;
  private roleListenerSubs: Subscription;
  
  constructor(private http: HttpClient, private router: Router, private authService: AuthService){
    this.socket = io.connect('http://localhost:5000');
  }

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdminRole();
    this.roleListenerSubs = this.authService
    .getIsAdminListener()
    .subscribe(isAdmin => { this.isAdmin = isAdmin; }
    );
    console.log("get posts");
    this.getPosts();
    this.socket.on("getPosts",() => {
      this.getPosts();
    });
  }

  ngOnDestroy(){  
    this.roleListenerSubs.unsubscribe();
  }

  getPosts(){
    this.http.get('http://localhost:5000/api/post/getPosts').subscribe(response=>{
      console.log(response);
      this.posts = Object.values(response);
    })
  }

  onDelete(post){
    console.log(post);
    this.socket.emit('deletePost',post);
  }

  onEdit(post){
    localStorage.setItem('postEdit', post._id);
    this.router.navigate(['/editPost']);
  }
}
