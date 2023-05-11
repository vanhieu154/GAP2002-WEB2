import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Promotion } from './promotion';
import { Coupon } from './coupon';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private _http: HttpClient) { }
  getCoupons():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/coupons",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Coupon>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getPromotions():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/promotions",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Promotion>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getUserPromotions(_id:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/user_coupon/"+_id,requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Coupon>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getActivatePromotionsPage():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/ActivatePromotionsPage",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Promotion>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getActivatePromotionsProduct():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/ActivatePromotionsProduct",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getActivatePromotions():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/ActivatePromotions",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Promotion>),
      retry(3),
      catchError(this.handleError)
    )
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
