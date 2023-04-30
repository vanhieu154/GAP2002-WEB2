import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, switchMap, throwError } from 'rxjs';
import { Address } from './address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  addAddressToUser(_id: string, address: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    };

    return this.http.post<any>("http://localhost:4000/address/"+_id, JSON.stringify(address), requestOptions).pipe(
      switchMap(() => this.getAddress(_id)),
      retry(3),
      catchError(this.handleError)
    );
  }
  getAddress(_id:string):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    };
    return this.http.get<any>("http://localhost:4000/address/"+_id, requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Address>),
      retry(3),
      catchError(this.handleError)
    );
  }
  deleteAddress(Userid:string,AddressId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this.http.delete<any>("http://localhost:4000/address/"+Userid+"/"+AddressId,requestOptions).pipe(
    switchMap(() => this.getAddress(Userid)),
    retry(3),
    catchError(this.handleError))
  }

  updateAddress(Userid:string,Address:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this.http.put<any>("http://localhost:4000/address",JSON.stringify(Address),requestOptions).pipe(
      switchMap(() => this.getAddress(Userid)),
      retry(3),
      catchError(this.handleError)
    )
  }
  updateAddressDefault(Userid:string,AddressId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this.http.get<any>("http://localhost:4000/address/setDefault/"+Userid+"/"+AddressId,requestOptions).pipe(
      switchMap(() => this.getAddress(Userid)),
      retry(3),
      catchError(this.handleError)
    )
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
