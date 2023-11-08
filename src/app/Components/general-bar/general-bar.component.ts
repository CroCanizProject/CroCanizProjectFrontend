import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-general-bar',
  templateUrl: './general-bar.component.html',
  styleUrls: ['./general-bar.component.css']
})
export class GeneralBarComponent {
//variable global para roles


  OnInit(){
    
  }
  @Input() rol:any;


}

