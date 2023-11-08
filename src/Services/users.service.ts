import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  url:string = "https://backend.crocainz.live/api/"

  getUsers():Observable<any>{
    return this.http.get(environment.url+ "roles/users")
   }
   Add(data:any){
    return this.http.post(this.url+"roles/users",data)
  }

  updateUser(id: any, data: any) {
    let direccion = this.url + "roles/users" + id + "?_method=PATCH";
    return this.http.post(direccion, data);
  }
  
}
