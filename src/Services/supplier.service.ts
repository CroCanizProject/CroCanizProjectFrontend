import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) {}
  url:string = "https://backend.crocainz.live/api/"

  getSuppliers():Observable<any>{ 
  return this.http.get(this.url+"suppliers")
}
addSupplier(data:any){
  return this.http.post(this.url+"suppliers",data)
}


updateSupplier(id:any,data:any){
  let direccion = this.url + "suppliers/" + id;
  return this.http.put(direccion, data)
}


getSupplier(id:any){
  return this.http.get(this.url+"suppliers/"+id)
}

deleteSupplier(id:any){
  return this.http.delete(this.url+"suppliers/"+id)
}



}
