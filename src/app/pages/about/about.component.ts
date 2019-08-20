import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Transform } from 'stream';

import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  users_cities = [];
  data = [];
  products = [];
  dataValues = [];
  dataKeys = [];
  categoryNumAndName = [];
  numOfCat = 0;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.countCategory();

    this.http.get('http://localhost:5000/api/userDetails/getCitySegmentation').subscribe(response => {

      for (const item of Object.entries(response)) {
        this.users_cities.push(item);
      }
      for (const city of this.users_cities) {
        this.data.push(Object.entries(city)[1][1][1]);
      }
    });



    this.http.get('http://localhost:5000/api/cart/getAllProducts').subscribe(response => {
      for (var i = 0; i < Object.values(response).length; i++) {
        var prodctsCart = Object.entries(response)[i][1].products;

        for (const product of prodctsCart) {
          this.products.push(product);
        }

      }
      const idList = this.products;
      this.http.post('http://localhost:5000/api/product_routes/topBrand', { idList: JSON.stringify(idList) }).subscribe(response => {


        for (let i = 0; i < Object.entries(response).length; i++) {
          this.dataValues.push(Object.entries(response)[i][1].value);
          this.dataKeys.push(Object.entries(response)[i][1]._id);
        }
      });

    });
  }



  countCategory() {
    this.http.get('http://localhost:5000/api/product_routes/countCategory').subscribe(response => {

      for (let cat of Object.entries(response)) {
        this.categoryNumAndName.push([cat[1].count, cat[1]._id]);
      }
      this.numOfCat = this.categoryNumAndName.length;
    });
  }

}
