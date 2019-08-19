import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  lat: number = 32.251684;
  lng: number = 34.919720;
  usersList;
  coordinats=[];
  markers = "";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.post("http://localhost:5000/api/userDetails/usersList",null).subscribe(response=>{
      var list = Object.values(Object.entries(Object.values(response)));
      var uList = [];
      for(let i=0;i<list.length;i++){

        uList.push(list[i][1]);
      }
      this.usersList = uList;
      for(let user of uList){
        if(user.lat){
          this.coordinats.push({lat: user.lat, lng: user.lng});
        }
      }
      for(let coord of this.coordinats){
        this.markers += '<agm-marker [latitude]="' + coord.lat + '" [longitude]="' + coord.lng + '"></agm-marker>';
      }

      console.log(this.markers);
    });
  }

}
