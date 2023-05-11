import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Product } from './product';
import { Order } from './order';
import { Address } from './address';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }
  postOrder(order:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.post<any>("http://localhost:4000/order/",JSON.stringify(order),requestOptions).pipe(
      map(res=>JSON.parse(res) as Order),
      retry(3),
      catchError(this.handleError)
    )
  }
  getOrders(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/order_user/"+_id,requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<Order>),
    retry(3),
    catchError(this.handleError))
  }
  getOrderDetail(_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/admin_order_detail/"+_id,requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getOrderAddress (_id:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/admin_order_address/"+_id,requestOptions).pipe(
      map(res=>JSON.parse(res) as Address),
      retry(3),
      catchError(this.handleError)
    )
  }
  updateOrder(aOrder:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.put<any>("http://localhost:4000/admin_order_update",JSON.stringify(aOrder),requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Order>),
      retry(3),
      catchError(this.handleError)
    )
  }
  getAllOrder ():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:4000/admin_order",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<Order>),
      retry(3),
      catchError(this.handleError)
    )
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
