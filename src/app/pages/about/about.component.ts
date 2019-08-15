import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Transform } from 'stream';
import * as d3 from 'd3';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  users_cities = [];
  dataSet = [ 80,100,205,38,56, 89];
  svgWidth = 500;
  svgHeight = 300;
  barPadding = 5;
  barWidth = (this.svgWidth / this.dataSet.length );
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get("http://localhost:5000/api/userDetails/getCitySegmentation").subscribe(response=>{
    console.log(Object.entries(response));

    for(let item of Object.entries(response)){
      this.users_cities.push(item);
    }
    console.log(this.users_cities)
    });

  var dataSet = [ 80,100,205,38,56];
  var svgWidth = 700;
  var svgHeight = 400;
  var barPadding = 50;
  var barWidth = (svgWidth / dataSet.length );
    var svg =  d3.select('svg').attr("width" , svgWidth).attr("height" , svgHeight)

    var barChart = svg.selectAll("rect").data(dataSet).enter().append("rect").attr("y", function(d) {
      return svgHeight - d }).attr( "height", function(d){
      return d}).attr("width" , barWidth - barPadding).attr("transform", function (d,i){
        var translate = [ barWidth * i , 0];
        return "translate(" + translate +")";
      });
  }

}
