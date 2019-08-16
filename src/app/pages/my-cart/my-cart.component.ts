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
  total = 0;
  displayedColumns: string[] =['Products', 'Price', 'Delete']
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
     if(Object.values(response).length>0){
      this.cart_products = (Object.entries(response)[0][1]).products;
      const idList = this.cart_products;
      console.log(idList);
      var pList=[]
        this.http.post("http://localhost:5000/api/product_routes/productsId" ,{idList: JSON.stringify(idList)}).subscribe(response => {
          this.productsList=response;
          for(let item of this.productsList){
            console.log(item.price)
            this.total += parseFloat(item.price)  ;
            console.log("total is : " + this.total)
          }
          console.log(this.productsList);
        });
      }
      this.productsList=[];
    });
  }

  onDelete(product){
    console.log(product);
    this.socket.emit('deleteProduct',{ email: localStorage.getItem('email'), product: product });
  }

  onClear(){
    console.log("clear");
    this.socket.emit('clearCart',{ email: localStorage.getItem('email') });
  }
}
