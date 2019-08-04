import { Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: [ './post-create.component.css' ]
})
export class PostCreateComponent {
  enteredValue =  '';
  enteredContent =  '';
  @Output() post_created = new EventEmitter<Post>();

  onAddedPost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    }
    this.post_created.emit(post);
  }
}

//change
