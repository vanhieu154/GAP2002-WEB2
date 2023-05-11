import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogs:any[]=[]
  errMessage: any;
  totalBlogs:number=1
  pageSize1: number = 3
  pageSizeOptions1: number[] = [3, 6, 9];
  pageSize2: number = 3
  pageSizeOptions2: number[] = [3, 6, 9];
  itemsOnPage1: any[] = [];
  itemsOnPage2: any[] = [];
  currentPage1: number = 0;
  currentPage2: number = 0;
  constructor(private _service: BlogService,private router:Router,private http: HttpClient){
    this._service.getBlogs().subscribe({
      next:(data)=>{
        this.blogs=data
        this.totalBlogs=data.length
        this.itemsOnPage1=data.slice(0,this.pageSize1)
        this.itemsOnPage2=data.slice(0,this.pageSize2)
      },
      error:(err)=>{this.errMessage=err}
    })

  }
  onPageChange1(event: PageEvent): void {
    this.currentPage1 = event.pageIndex;
    this.pageSize1 = event.pageSize;
    this.updateItemsOnPage1();
  }
  updateItemsOnPage1(): void {
    const startIndex = this.currentPage1 * this.pageSize1;
    this.itemsOnPage1 = this.blogs.slice(startIndex, startIndex + this.pageSize1);
  }
  onPageChange2(event: PageEvent): void {
    this.currentPage2 = event.pageIndex;
    this.pageSize2 = event.pageSize;
    this.updateItemsOnPage2();
  }
  updateItemsOnPage2(): void {
    const startIndex = this.currentPage2 * this.pageSize2;
    this.itemsOnPage2 = this.blogs.slice(startIndex, startIndex + this.pageSize2);
  }
  Detail(p: any) {
		this.router.navigate(['BlogDetail', p._id])
	}


}
