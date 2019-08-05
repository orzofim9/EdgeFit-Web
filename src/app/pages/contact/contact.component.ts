import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  lat: number = 32.251684;
  lng: number = 34.919720;
  constructor() { }

  ngOnInit() {
  }

}
