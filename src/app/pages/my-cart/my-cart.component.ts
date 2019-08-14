import { Component, OnInit, Injectable  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  socket:SocketIOClient.Socket;
  email;
  cart_products;
  productsList;
  displayedColumns: string[] =['Products', 'Price']
  constructor(private http: HttpClient, private router: Router) { 
    this.socket = io.connect('http://localhost:5000');
   }

  ngOnInit() {
    this.getProductList();
    this.socket.on('getCart',productsMap => {
      this.getProductList();
    });
  }

  getProductList(){
    this.email= localStorage.getItem('email');
    if(!this.email){
      alert("Need to sign in first");
      return;
    }
    this.http.get("http://localhost:5000/api/cart/getCartProducts/" + this.email).subscribe(response => {
      this.cart_products = (Object.entries(response)[0][1]).products;
      const idList = this.cart_products;
      console.log(idList);
      var pList=[]
        this.http.post("http://localhost:5000/api/product_routes/productsId" ,{idList: JSON.stringify(idList)}).subscribe(response => {
          this.productsList=response;
          console.log(this.productsList);
        });
    });
  }
}
