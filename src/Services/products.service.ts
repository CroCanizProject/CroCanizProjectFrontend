import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {}

  
  url:string = "https://backend.crocainz.live/api/"

  getProducts():Observable<any>{ 
  return this.http.get(this.url+"products?limit=30")
}
addProduct(data:any){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    })
  };
  return this.http.post(this.url+"products",data)
}


updateProduct(id: any, data: any) {
  let direccion = this.url + "products/" + id + "?_method=PATCH";
  return this.http.post(direccion, data);
}



getProduct(id:any){
  return this.http.get(this.url+"products/"+id)
}

deleteProduct(id:any){
  return this.http.delete(this.url+"products/"+id)
}



}