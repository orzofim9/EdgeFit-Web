import { Component, Input } from '@angular/core';

import { Post } from './post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent {
 /* posts = [
    {title: 'First title', content: 'First content'},
    {title: 'Second title', content: 'Second content'},
    {title: 'Third title', content: 'Third content'},
  ];
  */
 @Input() posts: Post[] = [];
}
