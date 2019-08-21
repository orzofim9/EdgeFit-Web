import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import * as io from 'socket.io-client';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  socket:SocketIOClient.Socket;
  postId;
  titleText =  '';
  contentText =  '';
  constructor(private router:Router, private http: HttpClient){
    this.socket = io.connect('http://localhost:5000');
  }

  
  ngOnInit() { 
    this.postId = localStorage.getItem('postEdit');
    if(this.postId){
      console.log("id " + this.postId);
      this.http.post('http://localhost:5000/api/post/getPost',{ _id: this.postId }).subscribe(response => {
      const post = response[0];
      this.titleText = post.title;
      this.contentText = post.content;
    });
    }
  }

  onUpdate(){
    const post = {
      _id: this.postId, 
      title: this.titleText, 
      content: this.contentText
    }
    this.socket.emit('updatePost', post);
    localStorage.removeItem('postEdit');
    this.router.navigate(["/"]);
  }
}
