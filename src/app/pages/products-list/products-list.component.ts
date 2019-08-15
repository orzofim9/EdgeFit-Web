import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { NgForm } from '@angular/forms';
var ahoCorasick = require('aho-corasick-search')

var acSearch = new ahoCorasick();

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  socket:SocketIOClient.Socket;
  productsList;
  filters;
  //productToCart;

  constructor(private http: HttpClient, private router: Router)
  {
    this.socket = io.connect('http://localhost:5000');
  }

  ngOnInit() {
    this.getProductsList();
    this.socket.on("getProducts", productMap => {
      this.getProductsList();
    });
  }

  getProductsList(){
    this.http.post("http://localhost:5000/api/product_routes/products",this.filters).subscribe(response=>{
      var list = Object.values(Object.entries(Object.values(response)));
      var pList = [];
      for(let i=0;i<list.length;i++){

        pList.push(list[i][1]);
        acSearch.add(list[i][1].brand);
      }

      this.productsList  = pList;
    });
  }

  onSearch(form: NgForm){
    acSearch.build();

    if(acSearch.search( form.value.brand).length>0){
    var searchFilters = {
      category: form.value.category,
      brand: acSearch.search( form.value.brand),
      price: form.value.price
    }
  }
    else{
      var searchFilters={
        category: form.value.category,
        brand:  form.value.brand,
        price: form.value.price
      };

    }
    this.filters = searchFilters;
    console.log(this.filters);
  }

  addToCart(product){
    const productToCart = {
      email: localStorage.getItem('email'),
      product: product._id
    }
    if(localStorage.getItem('email')){
      console.log(productToCart);
      this.socket.emit('productAddToCart',productToCart);
    }
    else{
      this.router.navigate(['/login']);
    }

  }
}


