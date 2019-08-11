import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  //socket:SocketIOClient.Socket;
  productsList;
  constructor(private http: HttpClient, private router: Router)
  {
    //this.socket = io.connect('http://localhost:5000');
  }

  ngOnInit() {
    this.getProductsList();
    /*this.socket.on("getProducts", productMap => {
      this.getProductsList();
    });*/
  }

  getProductsList(){
    this.http.get("http://localhost:5000/api/product_routes/products").subscribe(response=>{
      this.productsList = response;
    });
  }
}
