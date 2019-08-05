import { Component } from '@angular/core';

import { Post } from './posts/post-list/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stored_posts: Post[] = [];

  onPostAdded(post){
    this.stored_posts.push(post);
  }
}
