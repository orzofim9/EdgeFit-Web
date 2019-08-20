import { Directive, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Transform } from 'stream';

import { ConstantPool } from '@angular/compiler';

@Directive({
  selector: '[appGraph]'
})
export class GraphDirective {
  @Input() dataValues: Array<number>;
  @Input() dataKeys: Array<string>;
  constructor() { }

  ngAfterViewChecked() {


    var svgWidth = 1100;
    var svgHeight = 400;
   var barPadding = 80;
   var barWidth = (svgWidth / this.dataValues.length );
   var svg =  d3.select('svg' ).attr("width" , svgWidth).attr("height" , svgHeight).attr("fill", "blue")

  var barChart = svg.selectAll("rect").data(this.dataValues).enter().append("rect").attr("y", function(d) {
    return svgHeight - d }).attr( "height", function(d){
    return d}).attr("width" , barWidth - barPadding).attr("transform", function (d,i){
      var translate = [ barWidth * i , 0];
      return "translate(" + translate +")";
    });
    var i = 0;
    var dataValues = this.dataValues
    var text = svg.selectAll("text").data(this.dataKeys).enter()
    .append("text").text(function(d){

      d = d + " : " + dataValues[i].toFixed(2);
      i++;
        console.log("d is : " + d)
      return d;
    }).attr("y", function(d, i){console.log("d.v is: " + dataValues[i]); return svgHeight - dataValues[i]-5 }).attr("x",function(d,i){return barWidth * i})
  }

}
