import { Component, OnInit, Injectable  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  email;
  cart_products;
  productsList=[];
  displayedColumns: string[] =['Products', 'Price']
  constructor(private http: HttpClient, private router: Router) { this.getProductList() ;}

  ngOnInit() {
    //this.getProductList() ;
  }

  getProductList(){

    this.email= localStorage.getItem('email');
    if(!this.email){
      alert("Need to sign in first");
      return;
    }
    this.http.get("http://localhost:5000/api/cart/getCartProducts/" + this.email).subscribe(response => {
      this.cart_products = (Object.entries(response)[0][1]).products;
      console.log(this.cart_products);

      for(var i =0 ; i<this.cart_products.length ; i++){
        console.log(this.cart_products[i])
        this.http.get("http://localhost:5000/api/product_routes/productsId/" +this.cart_products[i] ).subscribe(response => {
        //  console.log(Object.entries(response)[0][1]);
          console.log(Object.entries(response)[0][1]);
          this.productsList.push(Object.entries(response)[0][1]);

          console.log(this.productsList[0].title);
        });
      }


    });


  }
}
