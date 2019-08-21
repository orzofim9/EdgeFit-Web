import { Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from "@angular/forms";
import * as uuid from 'uuid';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: [ './post-create.component.css' ]
})
export class PostCreateComponent {
  socket:SocketIOClient.Socket;
  enteredValue =  '';
  enteredContent =  '';
  constructor(private router:Router){
    this.socket = io.connect('http://localhost:5000');
  }

  onAddedPost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    const post = {
      id: uuid.v4(),
      title: form.value.title,
      content: form.value.content
    }
    this.socket.emit('addPost',post);
    this.router.navigate(['/']);
  }
}

