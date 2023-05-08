import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';

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
  constructor(private router:Router,private _service: BlogService,private activateRoute:ActivatedRoute){
    activateRoute.paramMap.subscribe(
      (param)=>{
        this.id=param.get('id')
        if(this.id!=null){
          this._service.getBlog(this.id).subscribe({
            next:(data)=>{this.blog=data},
            error:(err)=>{this.errMessage=err}
          })
        }
      }
    )
    this._service.getBlogs().subscribe({
      next:(data)=>{this.blogs=data.slice(0,3)},
      error:(err)=>{this.errMessage=err}
    })
  }
  Detail(p: any) {
		this.router.navigate(['BlogDetail', p._id])
	}
}
