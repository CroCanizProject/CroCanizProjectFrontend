import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GeneralIService {

  constructor(private http:HttpClient) {}
  url:string = "https://backend.crocainz.live/api/"


  getGeneralInfo():Observable<any>{ 
    return this.http.get(this.url+"companyinformation")
  }

  updateGeneralInfo(data:any){
    let direccion = this.url + "companyinformation" ;
    return this.http.put(direccion, data)
  }


  // getOneRegister():Observable<any>{ 
  //   return this.http.get(this.url+"companyinformation/1")
  // }






  
}
