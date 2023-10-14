import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) {}
  url:string = "https://backend.crocainz.live/api/"

getCategories():Observable<any>{ 
  return this.http.get(this.url+"categories")
}
addCategory(data:any){
  return this.http.post(this.url+"categories",data)
}
getCategory(id:any){
  return this.http.get(this.url+"categories/"+id)
}
deleteCategory(id:any){
  return this.http.delete(this.url+"categories",id)
}

}

