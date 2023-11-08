import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

currentRol= localStorage.getItem("rol")
currentUserData = {'name': localStorage.getItem("userName"), 'rol': localStorage.getItem("rol")}

  


}
