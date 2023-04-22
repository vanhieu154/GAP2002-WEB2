import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private searchSource = new BehaviorSubject<any>('');
  currentSearch = this.searchSource.asObservable();
  constructor() { }
  productSearch(type:any) {
    this.searchSource.next(type);
  }
}

