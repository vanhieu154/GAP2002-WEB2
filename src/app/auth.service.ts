import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000';

  // Khởi tạo biến Islogging với giá trị ban đầu là false
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, { headers })
      .pipe(
        map(res => {
          // Nếu đăng nhập thành công, gán giá trị true cho biến isLoggedIn
          if(res.message==null){
            this.isLoggedIn = true;
            sessionStorage.setItem('checkLogin', '1');
            return res; // trả về res.send
          }else{
            return res;
          }

        }),
        retry(3),
        catchError(this.handleError)
      );
  }
  addUser(user: User): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<any>(`${this.apiUrl}/users`, user, { headers })
      .pipe(
        map(res => {
          return res;
        }),
        retry(3),
        catchError(this.handleError)
      );
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
