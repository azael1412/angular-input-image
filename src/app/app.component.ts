import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  //name = 'Angular';
  external = "";
  image = new FormControl('');
  constructor()
  {
    //  console.log(this.image);
  }
}
