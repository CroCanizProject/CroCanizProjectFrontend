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
addSuppliers(data:any){
  return this.http.post(this.url+"suppliers",data)
}
getSupp(id:any){
  return this.http.get(this.url+"suppliers/"+id)
}
deleteSuppliers(id:any){
  return this.http.delete(this.url+"suppliers" + id)
}

}


