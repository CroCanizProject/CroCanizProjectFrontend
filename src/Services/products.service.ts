import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {}
  url:string = "https://backend.crocainz.live/api/"

  getProducts():Observable<any>{ 
  return this.http.get(this.url+"products")
}
addProduct(data:any){
  return this.http.post(this.url+"products",data)
}


updateProduct(id:any,data:any){
  let direccion = this.url + "products/" + id;
  return this.http.put(direccion, data)
}


getProduct(id:any){
  return this.http.get(this.url+"products/"+id)
}

deleteProduct(id:any){
  return this.http.delete(this.url+"products/"+id)
}



}