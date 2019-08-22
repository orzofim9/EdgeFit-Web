import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let string = value;
    if(args[0] == "city"){
      string = "from "+ string + " city."
    }
    else if(args[0] == "users" && string == "1"){
      string = "There is " + string + " user" ;
    }
    else{
      string = "There are " + string + " users" ;
    }
    return string;
  }

}
