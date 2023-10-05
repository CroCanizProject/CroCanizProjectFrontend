import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from 'src/Interfaces/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  
  url:string = "http://192.168.56.1:8000/api/"


  signIn(authentication: Auth):Observable<Auth>{

    let direccion = this.url + "login";
    return this.http.post<Auth>(direccion, authentication)

  }

  storeToken(access_token:string){
    localStorage.setItem('access_token', access_token)
  }


  getToken(){
    return localStorage.getItem('access_token');
  }


 
  isLoggenIn():boolean{
    return !!localStorage.getItem('access_token')
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['/']);
  }







}
