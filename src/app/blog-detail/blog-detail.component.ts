import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {
  id:any;
  blogs:any[]=[];
  blog=new Blog()
  errMessage: any;
  totalBlogs1:number=1
  pageSize1: number = 3
  pageSizeOptions1: number[] = [3, 6, 9];
  itemsOnPage1: any[] = [];
  currentPage1: number = 0;
  constructor(private router:Router,private _service: BlogService,private activateRoute:ActivatedRoute){
    activateRoute.paramMap.subscribe(
      (param)=>{
        this.id=param.get('id')
        if(this.id!=null){
          this._service.getBlog(this.id).subscribe({
            next:(data)=>{
              this.blog=data
            },
            error:(err)=>{this.errMessage=err}
          })
        }
      }
    )
    this._service.getBlogs().subscribe({
      next:(data)=>{
        this.blogs=data.slice(0,3)
        this.totalBlogs1=data.length
        this.itemsOnPage1=data.slice(0,this.pageSize1)
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

  Detail(p: any) {
		this.router.navigate(['BlogDetail', p._id])
	}
}
