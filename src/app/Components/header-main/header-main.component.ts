import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent {

  constructor(private fb: FormBuilder,public router: Router,private auth:AuthService) {}

  logout(){
    this.auth.signOut();
  }
  @Input() 
  userData:any; 
}
